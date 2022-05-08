const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReviews = async (productId, limit, userId) => {
    return await prisma.reviews.findMany({
        take: limit,
        where: {
            product_id: productId,
        },
        select: {
            id: true,
            users: {
                select: {
                    id: true,
                    username: true,
                },
            },
            rating: true,
            content: true,
            image: true,
            created_at: true,
            updated_at: true,
            reviews_likes: {
                select: {
                    id: true,
                },
                where: {
                    user_id: userId,
                },
            },
        },
    });
};

const makeReview = async (productId, userId, rating, content, imageAddr) => {
    return await prisma.reviews.create({
        data: {
            product_id: productId,
            user_id: userId,
            rating: rating,
            content: content,
            image: imageAddr,
        },
    });
};

const makeReviewLikes = async (reviewId, userId) => {
    return await prisma.reviews_likes.create({
        data: {
            review_id: reviewId,
            user_id: userId,
        },
    });
};

const getReviewLikes = async (reviewId, userId) => {
    return await prisma.reviews_likes.findMany({
        select: {
            id: true,
        },
        where: {
            review_id: reviewId,
            user_id: userId,
        },
    });
};

const updateReview = async (reviewId, rating, content, imageAddr) => {
    return await prisma.reviews.update({
        where: {
            id: reviewId,
        },
        data: {
            rating: rating,
            content: content,
            image: imageAddr,
        },
    });
};

const deleteReview = async reviewId => {
    return await prisma.reviews.delete({
        where: {
            id: reviewId,
        },
    });
};

const deleteReviewLikes = async reviewLikesId => {
    return await prisma.reviews_likes.delete({
        where: {
            id: reviewLikesId,
        },
    });
};

module.exports = {
    getReviews,
    getReviewLikes,
    makeReview,
    makeReviewLikes,
    updateReview,
    deleteReview,
    deleteReviewLikes,
};
