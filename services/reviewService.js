const reviewDao = require("../models/reviewDao");


const getReviews = async (productId, limit) => {
  try {
    return await reviewDao.getReviews(productId, limit);
  } catch (error) {
    console.log(error)
    throw await error;
  }
}

const makeReview = async (productId, userId, rating, content) => {
  try {
    return await reviewDao.makeReview(productId, userId, rating, content);
  } catch (error) {
    console.log(error)
    throw await error;
  }
}

const uploadReviewImage = async (reviewId, reviewImageAddr) => {
  try {
    return await reviewDao.uploadReviewImage(reviewId, reviewImageAddr);
  } catch (error) {
    console.log(error)
   throw await error; 
  }
};

module.exports = {
  getReviews,
  makeReview,
  uploadReviewImage
};