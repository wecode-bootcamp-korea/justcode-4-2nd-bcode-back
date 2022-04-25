const reviewDao = require('../models/reviewDao');

const getReviews = async (productId, limit) => {
    try {
        return await reviewDao.getReviews(Number(productId), Number(limit));
    } catch (error) {
        console.log(error);
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
        console.log(error);
        throw await error;
    }
};

const uploadReviewImageOnly = async (reviewId, reviewImageAddr) => {
    try {
        return reviewImageAddr.map(
            async imageAddr =>
                await reviewDao.uploadReviewImageOnly(
                    Number(reviewId),
                    imageAddr
                )
        );
    } catch (error) {
        console.log(error);
        throw await error;
    }
};

const deleteReview = async reviewId => {
    try {
        return await reviewDao.deleteReview(Number(reviewId));
    } catch (error) {
        console.log(error);
        throw await error;
    }
};

module.exports = {
    getReviews,
    makeReview,
    uploadReviewImageOnly,
    deleteReview,
};
