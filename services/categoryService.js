const categorytDao = require("../models/categoryDao");

const categoryList = async () => {
  return await categorytDao.getCategoryList()
}

const categoryDetail = async (id, limit, highprice, lowprice, review) => {
  return await categorytDao.getCategoryDetail(id, limit, highprice, lowprice, review)
}

module.exports = {
  categoryList,
  categoryDetail

};