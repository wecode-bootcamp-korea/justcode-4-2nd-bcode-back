const categorytDao = require("../models/categoryDao");

const categoryList = async () => {
  return await categorytDao.getCategoryList()
}

const categoryDetail = async (id) => {
  return await categorytDao.getCategoryDetail(id)
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
  categoryHighPrice,
  categoryRowPrice,
  categoryReview
};