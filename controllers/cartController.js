const cartService = require('../services/cartService');
const jwt = require('jsonwebtoken');
const YOUR_SECRET_KET = process.env.SECRET_KEY;

const updateCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.params
    // const { token } = req.headers

    // const user_id = jwt.verify(token, YOUR_SECRET_KET)
    const itemsInCart = await cartService.updateCart(product_id, 1, quantity)

    return res.status(200).json({ message: itemsInCart })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const deleteItemFromCart = async (req, res) => {
  try {
    const { product_id } = req.params
    // const { token } = req.headers

    // const user_id = jwt.verify(token, YOUR_SECRET_KET)
    const itemsInCart = await cartService.deleteItemFromCart(product_id, 1)

    return res.status(200).json({ message: itemsInCart })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}


module.exports = {
  updateCart,
  deleteItemFromCart
}