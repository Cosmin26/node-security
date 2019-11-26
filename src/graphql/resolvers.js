import UserService from "../services/UserService";
import AuthenticationService from "../services/AuthenticationService";
import config from "../config";

const resolvers = {
  Query: {
    // fetch the profile of currently authenticated user
    async me(_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error("You are not authenticated!");
      }

      // user is authenticated
      return UserService.getUserById(user.id);
    }
  },

  Mutation: {
    // Handle user signup
    async signup(_, { name, email, password }) {
      AuthenticationService.signup(name, email, password);
    },

    // Handles user login and return tokens
    async login(_, { email, password }) {
      const user = await AuthenticationService.login(email, password);

      const jwtToken = AuthenticationService.generateJwtToken(user, config.jwtSecret, config.jwtTokenExpiresIn);
      const refreshToken = AuthenticationService.generateJwtToken(
        user,
        config.refreshSecret,
        config.refreshTokenExpiresIn
      );
      user.refreshToken = refreshToken;
      await UserService.updateUser(user.id, user);

      // return json web token
      return { jwtToken, refreshToken };
    },

    // Handles user refreshToken
    async refreshToken(_, { refreshToken }) {
      const decodedToken = AuthenticationService.decodeJwtToken(refreshToken, config.refreshSecret);

      const jwtToken = AuthenticationService.generateJwtToken(
        decodedToken.user,
        config.jwtSecret,
        config.jwtTokenExpiresIn
      );

      // return json web token
      return jwtToken;
    }
  }
};

export default resolvers;
