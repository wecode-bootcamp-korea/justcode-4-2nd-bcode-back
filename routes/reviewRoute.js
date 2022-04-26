const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const validateToken = require('../middlewares/validateToken');
const reviewController = require('../controllers/reviewController');

const makeReviewFolder = async (req, res, next) => {
    // upload 폴더 지정 (없으면 생성)
    try {
        fs.readdirSync(`data/uploads/review`);
    } catch (error) {
        fs.mkdirSync(`data/uploads/review`, { recursive: true }, err => {
            console.log(err);
        });
    }
    next();
};

const upload = multer({
    storage: multer.diskStorage({
        // 업로드된 이미지 저장 경로 지정
        destination(req, file, cb) {
            cb(null, `data/uploads/review`);
        },
        // 업로드된 이미지 파일 이름 지정
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // 파일 크기 제한 10MB
    limits: { fileSize: 10 * 1024 * 1024 },
});

// GET
router.get('/', reviewController.getReviews);

// POST
// form태그 name은 "reviewImage"로 일치시켜야 파일을 받을 수 있습니다.
router.post(
    '/',
    validateToken.validateToken,
    makeReviewFolder,
    upload.array('reviewImage'),
    function (req, res, next) {
        next();
    },
    reviewController.makeReview
);
router.post(
    '/image',
    validateToken.validateToken,
    makeReviewFolder,
    upload.array('reviewImage'),
    function (req, res, next) {
        next();
    },
    reviewController.uploadReviewImageOnly
);

// PUT
router.put(
    '/:reviewId',
    validateToken.validateToken,
    makeReviewFolder,
    upload.array('reviewImage'),
    function (req, res, next) {
        next();
    },
    reviewController.updateReview
);

// DELETE
router.delete('/', validateToken.validateToken, reviewController.deleteReview);

module.exports = router;
