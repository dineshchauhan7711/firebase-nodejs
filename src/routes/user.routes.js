const router = require("express").Router();

const userController = require("../controller/user.controller");

const { authMiddleware } = require("../middleware/auth");

router.post("/create-user", userController.createUser);
router.post("/login", userController.login);
router.get("/get-user", authMiddleware, userController.getUser);



module.exports = router