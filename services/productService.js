const productDao = require("../models/productDao");

const getProductList = async () => {
  return await productDao.getProductList()
}
const getProductDetail = async (product_id, limit) => {
  const detail =  await productDao.getProductDetail(Number(product_id), Number(limit))
  const reviewSum = await productDao.getProductReviewSum(Number(product_id))

  detail.reviewSum = reviewSum
  return detail
}

module.exports = {
  getProductList,
  getProductDetail
};