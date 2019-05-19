const User = require("../models/user");
const Constants = require("../utils/constants");

/**
 * Error to inform that a user has already been registered.
 */
const userAlreadyRegisteredError = {
  error: 500,
  message: "User already registered."
}

class UserController {

  /**
   * Creates a new user.
   * @param {*} req The request to the server. 
   * @param {*} res The response object to the client.
   */
  async register(req, res) {
    try {
      if (await this.isRegistered(req.body.email)) {
        res.send(userAlreadyRegisteredError);
      } else {
        const response = { ...Constants.responseTemplate };
        response.data = { user: await new User(req.body).save() };
        res.send(response);
      }
    } catch (err) {
      const response = { ...Constants.responseTemplate };
      response.code = 400;
      response.data = err;
      res.send(response);
    }
  }

  /**
   * TODO: Requires auth.
   * 
   * @param req The request to the server.
   * @param res The response object.
   */
  async getUserByEmail(req, res) {
    try {
      const response = { ...Constants.responseTemplate };
      response.data = { user: await User.where({ email: req.query.email }).findOne() };
      res.send(response);
    } catch (err) {
      const response = { ...Constants.responseTemplate };
      response.code = 400;
      response.data = err;
      res.send(response);
    }
  }

  /**
   * Tell us if this email was registered or not.
   * @param {String} email The email to check if it is registrerd or not.
   */
  async isRegistered(email) {
    try {
      const query = User.where({ email: email });
      return await query.findOne() != null;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * TODO: Requires auth and admin permissions.
   * 
   * @param res The response object.
   */
  async getUserListing(res) {
    try {
      const response = { ...Constants.responseTemplate };
      response.data = { users: await User.find() }
      res.send(response);
    } catch (err) {
      console.log(err);
      const response = { ...Constants.responseTemplate };
      response.code = 500;
      response.data = err;
      res.send(response);
    }
  }
}

module.exports = new UserController();