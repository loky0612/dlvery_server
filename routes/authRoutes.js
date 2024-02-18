const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, loginUser, getOrders } = require("../controllers/authControllers");


router.use(
    cors({
        credentials: true,
        origin: 'http://dlvery-application.s3-website.ap-south-1.amazonaws.com'
    })
)

router.get("/", test);
router.post('/loginUser',loginUser);
router.post('/getOrders',getOrders);

module.exports = router;