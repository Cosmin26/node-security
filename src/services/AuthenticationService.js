import jwt from "jsonwebtoken";
import LoggerInstance from "../loaders/logger";
import AuthenticationUtil from "../utils/AuthenticationUtil";
import UserService from "./UserService";

export default class AuthenticationService {
  static async signup(name, email, password) {
    try {
      const user = { name, email, password };
      user.password = await AuthenticationUtil.hashPassword(user.password);
      const createdUser = await UserService.createUser(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        LoggerInstance.error("🔥 User with email: %o, not found", email);
        throw new Error(`User with email: ${email}, not found`);
      }
      const validate = await AuthenticationUtil.validatePassword(password, user);
      if (!validate) {
        LoggerInstance.error("🔥 Wrong password", password);
        throw new Error(`Wrong password`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static generateJwtToken(user, secret, expiresIn) {
    const body = { id: user.id, email: user.email, name: user.name };
    const token = jwt.sign({ user: body }, secret, {
      expiresIn
    });
    return token;
  }

  static decodeJwtToken(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      throw e;
    }
  }
}
