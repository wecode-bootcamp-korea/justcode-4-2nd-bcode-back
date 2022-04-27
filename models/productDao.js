const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductList = async () => {
    return await prisma.$queryRaw`
    SELECT 
        p.id, p.name, p.image_url, p.price_before, p.price_after, 
        b.name AS "brand_name", r.ratingAvg, r.contentCnt
    FROM 
        products p
    LEFT JOIN 
        brands b
    ON b.id = p.brand_id
    LEFT JOIN 
        (SELECT r.product_id, AVG(r.rating) AS ratingAvg, COUNT(r.content) AS contentCnt
          FROM reviews r
          GROUP BY r.product_id
        ) r
    ON r.product_id = p.id
    ;
  `;
};

const getProductDetail = async (product_id, limit) => {
    return await prisma.products.findUnique({
        select: {
            name: true,
            image_url: true,
            price_before: true,
            price_after: true,
            brands: {
                select: {
                    name: true,
                },
            },
            reviews: {
                take: limit,
                select: {
                    id: true,
                    rating: true,
                    content: true,
                    image: true,
                    users: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    product_id: true,
                    created_at: true,
                    reviews_likes: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
        where: {
            id: Number(product_id),
        },
    });
};

const getProductReviewSum = async product_id => {
    return await prisma.reviews.aggregate({
        _avg: {
            rating: true,
        },
        _count: {
            id: true,
        },
        where: {
            product_id: product_id,
        },
    });
};

const getVisitedProduct = async product_id => {
    return await prisma.products.findMany({
        where: {
            id: { in: product_id },
        },
        select: {
            id: true,
            name: true,
            image_url: true,
            price_before: true,
            price_after: true,
            brands: {
                select: {
                    name: true,
                },
            },
        },
    });
};

const searchProduct = async name => {
    name = '%' + name.name + '%';
    return await prisma.$transaction([
        prisma.$queryRaw`
            SELECT 
                p.id, p.name, p.image_url, b.name AS brand_name, 
                p.price_before, p.price_after, p.created_at, p.updated_at
            FROM 
                products p
            JOIN
                brands b
            ON
                p.brand_id = b.id
            WHERE
                p.name
            LIKE
                ${name}
        `,
        prisma.$queryRaw`
        SELECT 
            p.id, p.name, p.image_url, b.name AS brand_name, 
            p.price_before, p.price_after, p.created_at, p.updated_at
        FROM 
            products p
        JOIN
            brands b
        ON
            p.brand_id = b.id
        WHERE
            b.name
        LIKE
            ${name}

        `,
    ]);
};
module.exports = {
    getProductList,
    getProductDetail,
    getProductReviewSum,
    getVisitedProduct,
    searchProduct,
};
