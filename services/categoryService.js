const categorytDao = require("../models/categoryDao");

const categoryList = async () => {
  return await categorytDao.getCategoryList()
}

const categoryDetail = async (id) => {
  return await categorytDao.getCategoryDetail(id)
}

// const categoryDetail = async (id, limit, highprice, rowprice, review) => {
//   return await categorytDao.getCategoryDetail(id, limit, highprice, rowprice, review)
// }

const categoryDetailLimit = async (id, limit) => {
  return await categorytDao.getCategoryDetailLimit(id, limit)
}

const categoryHighPrice = async (id) => {
  return await categorytDao.getHighPrice(id)
}

const categoryRowPrice = async (id) => {
  return await categorytDao.getRowPrice(id)
}

const categoryReview = async (id) => {
  return await categorytDao.getReview(id)
}


module.exports = {
  categoryList,
  categoryDetail,
  categoryDetailLimit,
  categoryHighPrice,
  categoryRowPrice,
  categoryReview
};