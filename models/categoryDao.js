const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategoryList = async () => {
  return await prisma.$queryRaw`
  SELECT id,name FROM categories;
  `
}

const getCategoryDetail = async (id) => {
  return await prisma.$queryRaw`
  SELECT cp.id, cp.product_id, cp.category_id, p.id, p.name, p.image_url, p.price_before, p.price_after,r.ratingAvg, r.contentCnt,b.name AS "brand_name"
  FROM categories_products cp
  LEFT JOIN products p
  ON cp.product_id = p.id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  WHERE cp.category_id=${id};
  `
}


// const getCategoryDetail = async (id, limit, highprice, rowprice, review) => {
//   return await prisma.$queryRaw`
//   SELECT cp.id, cp.product_id, cp.category_id, p.id, p.name, p.image_url, p.price_before, p.price_after,r.ratingAvg, r.contentCnt,b.name AS "brand_name"
//   FROM categories_products cp
//   LEFT JOIN products p
//   ON cp.product_id = p.id
//   LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
//   ON r.product_id = p.id
//   LEFT JOIN brands b
//   ON b.id = p.brand_id
//   WHERE cp.category_id=${id}
//   ${limit ? Prisma.sql`LIMIT ${limit}` : Prisma.empty},
//   ${ORDER ? Prisma.sql`ORDER BY ${highprice} DESC` : Prisma.empty},
//   ${ORDER ? Prisma.sql`ORDER BY ${rowprice}` : Prisma.empty},
//   ${ORDER ? Prisma.sql`ORDER BY ${review} DESC ` : Prisma.empty}
// `
// }


async function getCategoryDetailLimit(id, limit) {
  return await prisma.$queryRaw`
  SELECT cp.id, cp.product_id, cp.category_id, p.id, p.name, p.image_url, p.price_before, p.price_after,r.ratingAvg, r.contentCnt,b.name AS "brand_name"
  FROM categories_products cp
  LEFT JOIN products p
  ON cp.product_id = p.id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  WHERE cp.category_id=${id}
  LIMIT ${limit};
`;
}

const getHighPrice = async (id) => {
  return await prisma.$queryRaw`
  SELECT cp.id, cp.product_id, cp.category_id, p.id, p.name, p.image_url, p.price_before, p.price_after,r.ratingAvg, r.contentCnt,b.name AS "brand_name"
  FROM categories_products cp
  LEFT JOIN products p
  ON cp.product_id = p.id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  WHERE cp.category_id=${id};
  ORDER BY p.price_after DESC;
`
}


const getRowPrice = async (id) => {
  return await prisma.$queryRaw`
  SELECT cp.id, cp.product_id, cp.category_id, p.id, p.name, p.image_url, p.price_before, p.price_after,r.ratingAvg, r.contentCnt,b.name AS "brand_name"
  FROM categories_products cp
  LEFT JOIN products p
  ON cp.product_id = p.id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  WHERE cp.category_id=${id};
  ORDER BY p.price_after;
`
}


const getReview = async (id) => {
  return await prisma.$queryRaw`
  SELECT cp.id, cp.product_id, cp.category_id, p.id, p.name, p.image_url, p.price_before, p.price_after,r.ratingAvg, r.contentCnt,b.name AS "brand_name"
  FROM categories_products cp
  LEFT JOIN products p
  ON cp.product_id = p.id
  LEFT JOIN (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt FROM reviews r GROUP BY r.product_id ) r
  ON r.product_id = p.id
  LEFT JOIN brands b
  ON b.id = p.brand_id
  WHERE cp.category_id=${id};
  ORDER BY r.ratingAvg DESC;
`
}




module.exports = {
  getCategoryList,
  getCategoryDetail,
  getCategoryDetailLimit,
  getHighPrice,
  getRowPrice,
  getReview
};