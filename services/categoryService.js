const categorytDao = require("../models/categoryDao");

const getProductList = async () => {
  return await productDao.getProductList()
}
const getProductDetail = async (product_id) => {
  return await productDao.getProductDetail(product_id)
}


module.exports = {
  getProductList,
  getProductDetail
};