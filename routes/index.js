const express = require("express");
const router = express.Router();


const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");
const reviewRoute = require("./reviewRoute");


// router.use('/', productRoute)
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)
router.use('/review', reviewRoute)



module.exports = router;