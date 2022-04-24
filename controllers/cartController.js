const cartService = require('../services/cartService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


const currentCart = async (req, res) => {
  try {
    const { token } = req.headers

    const currentCart = await cartService.currentCart(1)

    return res.status(200).json(currentCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCart = async (req, res) => {
  try {
    const { token } = req.headers
    const { product_id } = req.params
    const { quantity, setQuantity } = req.query

    // const user_id = jwt.verify(token, SECRET_KEY)
    const itemsInCart = await cartService.updateCart(product_id, 1, quantity, setQuantity)

    return res.status(200).json({ message: itemsInCart })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const deleteItemFromCart = async (req, res) => {
  try {
    const { token } = req.headers
    const { product_id } = req.params

    // const user_id = jwt.verify(token, SECRET_KEY)
    const itemsInCart = await cartService.deleteItemFromCart(product_id, 1)

    return res.status(200).json({ message: itemsInCart })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}


module.exports = {
  currentCart,
  updateCart,
  deleteItemFromCart
}