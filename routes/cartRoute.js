const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/:product_id/:quantity", cartController.updateCart)
router.delete("/:product_id", cartController.deleteItemFromCart)


module.exports = router