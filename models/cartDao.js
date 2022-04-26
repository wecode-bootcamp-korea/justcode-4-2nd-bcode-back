const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getCurrentCart = async (user_id) => {
  return await prisma.carts.findMany({
    select: {
      id: true,
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

const addNewItemToCart = async (product_id, user_id, quantity) => {
  return await prisma.carts.create({
    data: {
      product_id: product_id,
      user_id: user_id,
      quantity: quantity
    }
  })
}

const addMoreItemToCart = async (product_id, user_id, quantity, prevQuantity) => {
  return await prisma.$queryRaw`
    UPDATE
    carts
    SET
    quantity = ${prevQuantity + quantity}
    WHERE
    product_id = ${product_id} AND
    user_id = ${user_id}
    ;
  `
}

const updateItemInCart = async (product_id, user_id, setQuantity) => {
  return await prisma.$queryRaw`
    UPDATE
    carts
    SET
    quantity = ${setQuantity}
    WHERE
    product_id = ${product_id} AND
    user_id = ${user_id}
    ;
  `
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
  addNewItemToCart,
  addMoreItemToCart,
  updateItemInCart,
  deleteItemFromCart
};