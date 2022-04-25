const fs = require('fs');
const path = require('path');
const reviewService = require('../services/reviewService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const getReviews = async (req, res) => {
    try {
        const { productId, limit } = req.query;

        const reviews = await reviewService.getReviews(productId, limit);

        return res.status(200).json({ message: 'SUCCESS', reviews: reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const makeReview = async (req, res) => {
    try {
        // const { userid } = req.headers;
        const { productId, rating, content } = req.body;
        const images = req.files;

        const imagePath = images.map(image => image.path);

        const reviews = await reviewService.makeReview(
            productId,
            userId,
            rating,
            content,
            imagePath[0]
        );

        return res.status(200).json({ message: 'SUCCESS', reviews: reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const uploadReviewImageOnly = async (req, res) => {
    try {
        const { reviewId } = req.query;

        const images = req.files;
        const imagePath = images.map(image => image.path);
        const imageType = images.map(image => image.mimetype);

        await reviewService.uploadReviewImageOnly(reviewId, imagePath);

        // response 객체에 이미지를 하나만 보낼 수 있기 때문에 제일 처음 이미지만 반환합니다.
        fs.readFile(imagePath[0], function (error, data) {
            if (error) {
                return res.status(500).json({ message: 'SERVER_ERROR' });
            } else {
                return res
                    .status(200)
                    .header({ 'Content-Type': imageType[0] })
                    .end(data);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.body;

        await reviewService.deleteReview(reviewId);

        return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    makeReview,
    uploadReviewImageOnly,
    deleteReview,
};
