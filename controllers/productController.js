const productService = require("../services/productService");

const getProductDetail = async (req, res) => {
  try {
    const { product_id } = req.params;
    const productDetail = await productService.getProductDetail(product_id)    
  
    return res.status(200).json(productDetail)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }



}


module.exports = {
  getProductDetail
};