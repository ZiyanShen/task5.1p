const express = require('express');
const router = express.Router();
const homeController = require("../controllers/emailController")

router.post('/', homeController.email);

module.exports = router;