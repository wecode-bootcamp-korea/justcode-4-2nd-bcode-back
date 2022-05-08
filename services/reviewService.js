const reviewDao = require('../models/reviewDao');

const getReviews = async (productId, limit, userId) => {
    try {
        return await reviewDao.getReviews(
            Number(productId),
            Number(limit),
            Number(userId)
        );
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

const makeReviewLikes = async (productId, userId) => {
    try {
        const isLiked = await reviewDao.getReviewLikes(
            Number(productId),
            Number(userId)
        );

        if (isLiked.length !== 0) {
            throw new Error('EXISTING_LIKES');
        }
        return await reviewDao.makeReviewLikes(
            Number(productId),
            Number(userId)
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

const deleteReviewLikes = async reviewLikesId => {
    try {
        return await reviewDao.deleteReviewLikes(Number(reviewLikesId));
    } catch (error) {
        throw await error;
    }
};

module.exports = {
    getReviews,
    makeReview,
    makeReviewLikes,
    updateReview,
    deleteReview,
    deleteReviewLikes,
};
