const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getReviews = async (productId, limit) => {
  return await prisma.reviews.findMany({
    take: Number(limit),
    where: {
      product_id: Number(productId)
    },
    select: {
      id: true,
      users: {
        select: {
          id: true,
          username: true
        }
      },
      rating: true,
      content: true,
      image: true,
      created_at: true
    }
  })
};

const makeReview = async (productId, userId, rating, content) => {
  return await prisma.reviews.create({
    data: {
      product_id: Number(productId),
      user_id: Number(userId),
      rating: Number(rating),
      content: content
    }
  })
}

const uploadReviewImage = async (reviewId, reviewImageAddr) => {
  try {
    return await prisma.reviews.update({
      where: {
        id: Number(reviewId)
      },
      data: {
        image: reviewImageAddr
      }
    })
  } catch (error) {
    throw await error;
  }
};


module.exports = {
  getReviews,
  makeReview,
  uploadReviewImage
};