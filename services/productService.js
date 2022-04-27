const productDao = require('../models/productDao');

const getProductList = async () => {
    return await productDao.getProductList();
};

const getProductDetail = async (product_id, limit) => {
    const detail = await productDao.getProductDetail(
        Number(product_id),
        Number(limit)
    );
    const reviewSum = await productDao.getProductReviewSum(Number(product_id));

    detail.reviewSum = reviewSum;
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
