const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");
const { authentication } = require("../middelwear/auth");

router.post("/add-user", userController.registration);
router.post("/login-user", userController.loginUser);
router.post("/add-order", authentication, orderController.createOrder);
router.get("/get-order", authentication, orderController.getOrder);

module.exports = router;
