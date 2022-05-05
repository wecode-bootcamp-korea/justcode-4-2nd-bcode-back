const categorytDao = require("../models/categoryDao");

const categoryList = async () => {
  return await categorytDao.getCategoryList()
}

const categoryProduct = async (id, limit, highprice, lowprice, review) => {
  return await categorytDao.getCategoryProduct(id, limit, highprice, lowprice, review)
}

module.exports = {
  categoryList,
  categoryProduct

};