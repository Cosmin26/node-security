import database from "../db/models";

export default class UserService {
  static async getAllUsers() {
    try {
      return await database.User.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async createUser(newUser, getEmployeeId) {
    try {
      const createdUser = await database.User.create(newUser);
      if (getEmployeeId) getEmployeeId(createdUser);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      const UserToUpdate = await database.User.findOne({
        where: { id: Number(id) }
      });

      if (UserToUpdate) {
        await database.User.update(updateUser.dataValues ? updateUser.dataValues : updateUser, {
          where: { id: Number(id) }
        });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id },
        include: database.Company
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const theUser = await database.User.findOne({
        where: { email }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const UserToDelete = await database.User.findOne({ where: { id: Number(id) } });

      if (UserToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
