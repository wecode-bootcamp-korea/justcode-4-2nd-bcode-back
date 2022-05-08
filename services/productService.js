const productDao = require('../models/productDao');

const getProductList = async () => {
    return await productDao.getProductList();
};

const getProductDetail = async (productId, limit, userId) => {
    const detail = await productDao.getProductDetail(
        Number(productId),
        Number(limit),
        Number(userId)
    );
    const reviewSum = await productDao.getProductReviewSum(Number(productId));
    const reviewLikesSum = await productDao.getReviewLikesSum(
        Number(productId)
    );

    detail.reviewSum = reviewSum;
    detail.reviewLikesSum = reviewLikesSum;
    return detail;
};

const getVisitedProduct = async product_id => {
    product_id = product_id.split(',');
    product_id = product_id.map(id => Number(id));
    return await productDao.getVisitedProduct(product_id);
};

const searchProduct = async name => {
    return await productDao.searchProduct(name);
};

module.exports = {
    getProductList,
    getProductDetail,
    getVisitedProduct,
    searchProduct,
};
