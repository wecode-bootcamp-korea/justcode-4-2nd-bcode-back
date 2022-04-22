const productService = require("../services/productService");

const getProductList = async (req, res) => {
  try {
    const productList = await productService.getProductList();

    return res.status(200).json(productList)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const getProductDetail = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { limit } = req.query;

    const productDetail = await productService.getProductDetail(product_id, limit)    
  
    return res.status(200).json(productDetail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = {
  getProductList,
  getProductDetail
};