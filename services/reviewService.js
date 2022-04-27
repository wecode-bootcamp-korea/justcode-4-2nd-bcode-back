const reviewDao = require('../models/reviewDao');

const getReviews = async (productId, limit) => {
    try {
        return await reviewDao.getReviews(Number(productId), Number(limit));
    } catch (error) {
        throw await error;
    }
};

const makeReview = async (productId, userId, rating, content, imageAddr) => {
    try {
        return await reviewDao.makeReview(
            Number(productId),
            Number(userId),
            Number(rating),
            content,
            imageAddr
        );
    } catch (error) {
        throw await error;
    }
};

const updateReview = async (reviewId, rating, content, imageAddr) => {
    try {
        return await reviewDao.updateReview(
            Number(reviewId),
            Number(rating),
            content,
            imageAddr
        );
    } catch (error) {
        throw await error;
    }
};

const deleteReview = async reviewId => {
    try {
        return await reviewDao.deleteReview(Number(reviewId));
    } catch (error) {
        throw await error;
    }
};

module.exports = {
    getReviews,
    makeReview,
    updateReview,
    deleteReview,
};
