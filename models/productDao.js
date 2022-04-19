const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProductDetail = async (product_id) => {
  return await prisma.products.findUnique({
    select: {
      name: true,
      image_url: true,
      price_before: true,
      price_after: true,
      Brands: {
        select: {
          id: true,
          name: true
        }
      },
      Reviews: {
        select: {
          id: true,
          rating: true,
          content: true,
          image: true,
          user_id: true,
          product_id: true,
          Reviews_likes: {
            select: {
              id: true
            }
          }
        }
      }
    },
    where: {
      id: Number(product_id)
    }
  })
}


module.exports = {
  getProductDetail
};