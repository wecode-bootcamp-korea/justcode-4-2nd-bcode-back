const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProductList = async () => {
  return await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      image_url: true,
      price_before: true,
      price_after: true,
      brands: {
        select: {
          name: true
        }
      }
    }
  })
}

const getProductDetail = async (product_id, limit) => {
  return await prisma.products.findUnique({
    select: {
      name: true,
      image_url: true,
      price_before: true,
      price_after: true,
      brands: {
        select: {
          name: true
        }
      },
      reviews: {
        take: limit,
        select: {
          id: true,
          rating: true,
          content: true,
          image: true,
          users: {
            select: {
              id: true,
              username:true
            }
          },
          product_id: true,
          created_at:true,
          reviews_likes: {
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
  getProductList,
  getProductDetail
};