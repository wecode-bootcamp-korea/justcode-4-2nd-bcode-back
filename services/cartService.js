const cartDao = require('../models/cartDao');

const getCurrentCart = async user_id => {
    try {
        return await cartDao.getCurrentCart(Number(user_id));
    } catch (error) {
        throw await error;
    }
};

const updateCart = async (product_id, user_id, quantity, setQuantity) => {
    try {
        const currentCart = await cartDao.getCurrentCart(Number(user_id));
        const currenProducts = await Promise.all(
            currentCart.map(cart => cart.products.id)
        );
        const currenProductsIdx = currenProducts.indexOf(Number(product_id));

        if (currenProductsIdx === -1) {
            await cartDao.addNewItemToCart(
                Number(product_id),
                Number(user_id),
                Number(quantity)
            );
        } else if (currenProductsIdx !== -1 && !setQuantity) {
            if (currentCart[currenProductsIdx].quantity + quantity > 10) {
                quantity = 10 - currentCart[currenProductsIdx].quantity;
            }
            await cartDao.addMoreItemToCart(
                Number(product_id),
                Number(user_id),
                Number(quantity),
                Number(currentCart[currenProductsIdx].quantity)
            );
        } else if (currenProductsIdx !== -1 && setQuantity) {
            await cartDao.updateItemInCart(
                Number(product_id),
                Number(user_id),
                Number(setQuantity)
            );
        }

        return await cartDao.getCurrentCart(user_id);
    } catch (error) {
        throw await error;
    }
};

const deleteItemFromCart = async (product_id, user_id) => {
    try {
        await cartDao.deleteItemFromCart(Number(product_id), Number(user_id));
        return await cartDao.getCurrentCart(Number(user_id));
    } catch (error) {
        throw await error;
    }
};

const cleanCart = async user_id => {
    try {
        return await cartDao.cleanCart(Number(user_id));
    } catch (error) {
        throw await error;
    }
};

module.exports = {
    getCurrentCart,
    updateCart,
    deleteItemFromCart,
    cleanCart,
};
