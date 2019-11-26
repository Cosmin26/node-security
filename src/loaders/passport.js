import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import config from "../config";

export default () => {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (token, next) => {
        try {
          return next(null, token.user);
        } catch (error) {
          next(error);
        }
      }
    )
  );
  return passport;
};
