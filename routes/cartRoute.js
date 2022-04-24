const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const validateToken = require("../middlewares/validateToken");

router.get("/now", cartController.getCurrentCart)
router.put("/:productId", cartController.updateCart)
router.delete("/:productId", cartController.deleteItemFromCart)


module.exports = router