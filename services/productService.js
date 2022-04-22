const productDao = require("../models/productDao");

const getProductList = async () => {
  return await productDao.getProductList()
}
const getProductDetail = async (product_id, limit) => {
  return await productDao.getProductDetail(Number(product_id), Number(limit))
}


module.exports = {
  getProductList,
  getProductDetail
};