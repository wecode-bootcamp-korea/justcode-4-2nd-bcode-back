const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getReviews = async (productId, limit) => {
  return await prisma.reviews.findMany({
    take: limit,
    where: {
      product_id: productId
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
      created_at: true,
      updated_at: true
    }
  })
};

const makeReview = async (productId, userId, rating, content) => {
  return await prisma.reviews.create({
    data: {
      product_id: productId,
      user_id: userId,
      rating: rating,
      content: content
    }
  })
}

const uploadReviewImage = async (reviewId, reviewImageAddr) => {
  return await prisma.reviews.update({
    where: {
      id: reviewId
    },
    data: {
      image: reviewImageAddr
    }
  })
};

const deleteReview = async (reviewId) => {
  return await prisma.reviews.delete({
    where: {
      id: reviewId
    }
  })
}


module.exports = {
  getReviews,
  makeReview,
  uploadReviewImage,
  deleteReview
};