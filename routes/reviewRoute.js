const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

// GET
router.get('/', reviewController.getReviews);

// POST
router.post('/', reviewController.makeReview);
router.post('/image', reviewController.uploadReviewImage);

// DELETE
router.delete('/', reviewController.deleteReview);

module.exports = router;
