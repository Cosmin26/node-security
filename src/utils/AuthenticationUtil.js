import { hash, compare } from "bcryptjs";

export default class AuthenticationUtil {
  static async hashPassword(password) {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  static async validatePassword(password, user) {
    const isValid = await compare(password, user.password);
    return isValid;
  }
}
