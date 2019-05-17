const User = require("../models/user");
const Constants = require("../utils/constants");

const userAlreadyRegisteredError = {
  error: 500,
  message: "User already registered."
}

class UserController {

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

  async isRegistered(email) {
    try {
      const query = User.where({ email: email });
      return await query.findOne() != null;
    } catch (err) {
      console.log(err);
    }
  }

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