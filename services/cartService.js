const cartDao = require("../models/cartDao");

const updateCart = async (product_id, user_id, quantity) => {
  try {
    const currentCart = await cartDao.getCurrentCart(user_id)
    const doesItExist = await Promise.all(currentCart.map((cart) => 
      { return cart.products.id === Number(product_id)? 1 : 0 }
    ))
    
    console.log(doesItExist)
    if (doesItExist.indexOf(1) === -1) {
      await cartDao.addItemToCart(Number(product_id), Number(user_id), Number(quantity))
    } else {
      await cartDao.updateItemInCart(Number(product_id), Number(user_id), Number(quantity))
    }
    
    return await cartDao.getCurrentCart(user_id)
  } catch (error) {
    throw await error
  }
}

const deleteItemFromCart = async (product_id, user_id) => {
  try {
    await cartDao.deleteItemFromCart(Number(product_id), Number(user_id))
    return await cartDao.getCurrentCart(user_id)
  } catch (error) {
    throw await error
  }
}

module.exports = {
  updateCart,
  deleteItemFromCart
};