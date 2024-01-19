const express = require("express");

const { login, register, logout, current, updateUser } = require("../../controllers/auth/auth");
const { authenticate } = require("../../middlewares/authenticate");
const { validateBody } = require("../../middlewares/validateBody");
const schemasUser = require("../../schemas/user");

const router = express.Router();

router.post("/signup", validateBody(schemasUser.registerSchema), register);
router.post("/login", validateBody(schemasUser.loginSchema), login);
router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

// router.patch("/update", authenticate, upload.single("avatar"), controllerWrapper(saveImg), updateUser);
router.patch("/update", authenticate, updateUser);

module.exports = router;
