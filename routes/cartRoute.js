const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/now", cartController.currentCart)
router.put("/:product_id", cartController.updateCart)
router.delete("/:product_id", cartController.deleteItemFromCart)


module.exports = router