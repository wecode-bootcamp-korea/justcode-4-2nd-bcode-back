const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getCurrentCart = async (user_id) => {
  return await prisma.carts.findMany({
    select: {
      quantity: true,
      products: {
        select: {
          id: true,
          name: true,
          image_url: true,
          brands: {
            select: {
              name: true
            }
          },
          price_before: true,
          price_after: true
        }
      }
    },
    where: {
      user_id: user_id
    }
  })
}

const addItemToCart = async (product_id, user_id, quantity) => {
  return await prisma.carts.create({
    data: {
      product_id: product_id,
      user_id: user_id,
      quantity: quantity
    }
  })
}

const updateItemInCart = async (product_id, user_id, quantity) => {
  return await prisma.carts.update({
    where: {
      product_id: product_id,
      user_id: user_id
    },
    data: {
      quantity: quantity
    }
  })
}

const deleteItemFromCart = async (product_id, user_id) => {
  return await prisma.carts.deleteMany({
    where: {
      product_id: product_id,
      user_id: user_id
    }
  })
}


module.exports = {
  getCurrentCart,
  addItemToCart,
  updateItemInCart,
  deleteItemFromCart
};