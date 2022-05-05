const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategoryList = async () => {
  return await prisma.$queryRaw`
  SELECT id,name FROM categories;
  `
}

const getCategoryProduct = async (id, limit, highprice, lowprice, review) => {
  return await prisma.$queryRaw`
  SELECT
	  cp.id, 
		cp.product_id, 
		cp.category_id, 
		p.id, 
		p.name, 
		p.image_url, 
		p.price_before, 
		p.price_after,
		r.ratingAvg, 
		r.contentCnt,
		b.name AS "brand_name"
  FROM categories_products cp
  LEFT JOIN products p ON cp.product_id = p.id
  LEFT JOIN (
		SELECT 
			r.product_id, 
			AVG(r.rating) AS ratingAvg, 
			COUNT(r.content) AS contentCnt 
		FROM reviews r GROUP BY r.product_id ) r ON r.product_id = p.id
  LEFT JOIN brands b ON b.id = p.brand_id
  WHERE cp.category_id=${id}
  ${limit ? Prisma.sql`LIMIT ${limit}` : Prisma.empty}
  ${highprice ? Prisma.sql`ORDER BY p.price_after DESC` : Prisma.empty}
  ${lowprice ? Prisma.sql`ORDER BY p.price_after` : Prisma.empty}
  ${review ? Prisma.sql`ORDER BY r.ratingAvg DESC ` : Prisma.empty}
`
}

module.exports = {
  getCategoryList,
  getCategoryProduct
};