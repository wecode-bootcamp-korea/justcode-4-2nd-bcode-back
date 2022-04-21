const reviewService = require('../services/reviewService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const multer = require("multer");
const path = require("path");
const fs = require('fs');


const getReviews = async (req, res) => {
  try {
    const { productId, limit } = req.query;

    const reviews = await reviewService.getReviews(productId, limit);

    return res.status(200).json({ message: "SUCCESS", reviews: reviews });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

const makeReview = async (req, res) => {
  try {
    const { userid } = req.headers;
    const { productId, rating, content } = req.body;

    const reviews = await reviewService.makeReview(productId, userid, rating, content)
    
    return res.status(200).json({ message: "SUCCESS", reviews: reviews})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

const uploadReviewImage = async (req, res) => {
  try {
    const { reviewId } = req.query;
    let uploadFileName = ""

    // upload 폴더 지정 (없으면 생성)
    try {
      fs.readdirSync(`./data/uploads/review${reviewId}`)
    } catch (error) {
      fs.mkdirSync(`./data/uploads/review${reviewId}`, {recursive: true}, err => {console.log(err)})
    }

    const upload = multer({
      storage: multer.diskStorage({
        // 업로드된 이미지 저장 경로 지정
        destination(req, file, cb) {
          cb(null, `./data/uploads/review${reviewId}`);
        },
        // 업로드된 이미지 파일 이름 지정
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          uploadFileName = path.basename(file.originalname, ext) + Date.now() + ext
          cb(null, uploadFileName);
        },
      }),
      // 파일 크기 제한 10MB
      limits: { fileSize: 10 * 1024 * 1024 },
      // form태그 name은 "reviewImage"로 일치시켜야 파일을 받을 수 있습니다.
    }).array("reviewImage");

    upload(req, res, function (err) {
      if (err) {        
        return res.status(400).json({ message:"INVALID_FILE" }) 
      }
    })

    const reviewImageAddr = `data/uploads/review${reviewId}/${uploadFileName}`;

    console.log(reviewImageAddr)

    await reviewService.uploadReviewImage(reviewId, reviewImageAddr);
    return res.status(200).sendFile(reviewImageAddr, { root: '.' });
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.body;

    await reviewService.deleteReview(reviewId);
    
    return res.status(200).json({ message: "SUCCESS" })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  getReviews, 
  makeReview,
  uploadReviewImage,
  deleteReview
}