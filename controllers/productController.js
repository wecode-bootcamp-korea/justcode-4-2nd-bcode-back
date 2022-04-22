const productService = require("../services/productService");

const getProductList = async (req, res) => {
  try {
    const productList = await productService.getProductList();

    return res.status(200).json(productList)
  } catch (error) {
    res.status(500).json({ message: "SERVER_ERROR" })
  }
}

const getProductDetail = async (req, res) => {
  try {
    const { product_id } = req.params;
    const productDetail = await productService.getProductDetail(product_id)    
  
    return res.status(200).json(productDetail)
  } catch (error) {
    res.status(500).json({ message: "SERVER_ERROR" })
  }
}


module.exports = {
  getProductList,
  getProductDetail
};