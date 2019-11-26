import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import passportLoader from "./passport";
import schema from "../graphql/schema";

export default ({ app }) => {
  /**
   * Health Check endpoints
   * useful for loadbalancers to check if the app is ok
   */
  app.get("/status", (req, res) => {
    res
      .status(200)
      .json({ message: "is-healthy" })
      .end();
  });

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // load passport middlewares
  const passport = passportLoader();

  app.use("/graphql", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (user) {
        req.user = user;
      }

      next();
    })(req, res, next);
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      user: req.user
    })
  });

  server.applyMiddleware({
    app
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
