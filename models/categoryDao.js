const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategoryList = async () => {
  return await prisma.$queryRaw`
  SELECT id,name FROM categories;
  `
}


const getCategoryDetail = async (id) => {
  return await prisma.$queryRaw`
  SELECT p.id, p.name, p.image_url, p.price_before, p.price_after, b.name AS "brand_name", 
         r.ratingAvg, r.contentCnt, cp.category_id
  FROM products p
  LEFT JOIN categories_products cp
  ON p.id = cp.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  LEFT JOIN (
    SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt 
    FROM reviews r 
    GROUP BY r.product_id ) r
  ON r.product_id = p.id
  WHERE cp.category_id=${id};
  `
}

const getHighPrice = async (id) => {
  return await prisma.$queryRaw`
  SELECT p.id, p.name, p.image_url, p.price_before, p.price_after, b.name AS "brand_name", r.ratingAvg, r.contentCnt, cp.category_id
  FROM products p
  LEFT JOIN categories_products cp
  ON p.id = cp.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  WHERE cp.category_id=${id}
  ORDER BY p.price_after DESC;
  `
}


const getRowPrice = async (id) => {
  return await prisma.$queryRaw`
  SELECT p.id, p.name, p.image_url, p.price_before, p.price_after, b.name AS "brand_name", r.ratingAvg, r.contentCnt, cp.category_id
  FROM products p
  LEFT JOIN categories_products cp
  ON p.id = cp.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  WHERE cp.category_id=${id}
  ORDER BY p.price_after;
  `
}


const getReview = async (id) => {
  return await prisma.$queryRaw`
  SELECT p.id, p.name, p.image_url, p.price_before, p.price_after, b.name AS "brand_name", r.ratingAvg, r.contentCnt, cp.category_id
  FROM products p
  LEFT JOIN categories_products cp
  ON p.id = cp.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  WHERE cp.category_id=${id}
  ORDER BY r.ratingAvg DESC;
  `
}




module.exports = {
  getCategoryList,
  getCategoryDetail,
  getHighPrice,
  getRowPrice,
  getReview
};