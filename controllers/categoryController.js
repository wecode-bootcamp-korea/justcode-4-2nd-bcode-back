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

const categoryProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit, highprice, lowprice, review } = req.query
        const categoryProduct = await categoryService.categoryProduct(id, limit, highprice, lowprice, review)
        return res.status(200).json(categoryProduct)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

module.exports = {
    categoryList,
    categoryProduct
}