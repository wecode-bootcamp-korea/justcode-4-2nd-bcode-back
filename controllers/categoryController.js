const categoryService = require("../services/categoryService");


const categoryList = async (req, res) => {
    try {
        const categoryList = await categoryService.categoryList()
        return res.status(200).json(categoryList)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

const categoryDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit, highprice, rowprice, review } = req.query
        const categoryDetail = await categoryService.categoryDetail(id, limit, highprice, rowprice, review)
        return res.status(200).json(categoryDetail)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

module.exports = {
    categoryList,
    categoryDetail
}