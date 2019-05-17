var express = require('express');
var router = express.Router();
const controller = require("../controllers/user_controller");

/* Register user. */
router.post("/register", (req, res, next) => controller.register(req, res));
/* User listing. */
router.get("/all", (req, res, next) => controller.getUserListing(res));
/* User by email. */
router.get("/user", (req, res, next) => controller.getUserByEmail(req, res));

module.exports = router;
