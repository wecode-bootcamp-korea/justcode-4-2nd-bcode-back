const categorytDao = require("../models/categoryDao");

const categoryList = async () => {
  return await categorytDao.getCategoryList()
}

const categoryDetail = async (id, limit, highprice, rowprice, review) => {
  return await categorytDao.getCategoryDetail(id, limit, highprice, rowprice, review)
}

module.exports = {
  categoryList,
  categoryDetail

};