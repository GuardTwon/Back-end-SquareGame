const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  validationLogin,
  renewToken,
} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/new",
  [
    check("name", "This name is required").not().isEmpty(),
    check("email", "This email is required").isEmail(),
    check("password", "The password must be at least 6 character").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "This email is required").isEmail(),
    check("password", "This password must be at least 6 character").isLength({
      min: 6,
    }),
    validateFields,
  ],
  validationLogin
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
