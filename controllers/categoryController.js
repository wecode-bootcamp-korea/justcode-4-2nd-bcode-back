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
        const categoryDetail = await categoryService.categoryDetail(id)
        return res.status(200).json(categoryDetail)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

// const categoryDetail = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { limit, highprice, rowprice, review } = req.query
//         const categoryDetail = await categoryService.categoryDetail(id, limit, highprice, rowprice, review)
//         return res.status(200).json(categoryDetail)
//     } catch (err) {
//         console.log(err)
//         return res.status(err.status || 500).json({ message: err.message })
//     }
// }

const categoryDetailLimit = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit } = req.query;
        const categoryDetailLimit = await categoryService.categoryDetailLimit(id, limit)
        return res.status(200).json(categoryDetailLimit)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}



const categoryHighPrice = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryHighPrice = await categoryService.categoryHighPrice(id)
        return res.status(200).json(categoryHighPrice)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

const categoryRowPrice = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryRowPrice = await categoryService.categoryRowPrice(id)
        return res.status(200).json(categoryRowPrice)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

const categoryReview = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryReview = await categoryService.categoryReview(id)
        return res.status(200).json(categoryReview)
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json({ message: err.message })
    }
}

module.exports = {
    categoryList,
    categoryDetail,
    categoryDetailLimit,
    categoryHighPrice,
    categoryRowPrice,
    categoryReview
}