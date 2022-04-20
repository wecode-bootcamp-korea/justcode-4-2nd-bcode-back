const productDao = require("../models/productDao");

const getProductDetail = async (product_id) => {
  return await productDao.getProductDetail(product_id)
}



module.exports = {
  getProductDetail
};