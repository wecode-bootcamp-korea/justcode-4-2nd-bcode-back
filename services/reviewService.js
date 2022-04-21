const reviewDao = require("../models/reviewDao");


const getReviews = async (productId, limit) => {
  try {
    return await reviewDao.getReviews(Number(productId), Number(limit));
  } catch (error) {
    console.log(error)
    throw await error;
  }
}

const makeReview = async (productId, userId, rating, content) => {
  try {
    return await reviewDao.makeReview(Number(productId), Number(userId), Number(rating), content);
  } catch (error) {
    console.log(error)
    throw await error;
  }
}

const uploadReviewImage = async (reviewId, reviewImageAddr) => {
  try {
    return await reviewDao.uploadReviewImage(Number(reviewId), reviewImageAddr);
  } catch (error) {
    console.log(error)
    throw await error; 
  }
};

const deleteReview = async (reviewId) => {
  try {
    return await reviewDao.deleteReview(Number(reviewId))
  } catch (error) {
    console.log(error)
    throw await error;
  }
}

module.exports = {
  getReviews,
  makeReview,
  uploadReviewImage,
  deleteReview
};