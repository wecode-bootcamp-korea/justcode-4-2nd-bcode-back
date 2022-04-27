const cartService = require('../services/cartService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const getCurrentCart = async (req, res) => {
    try {
        // const { token } = req.headers

        // const userId = jwt.verify(token, SECRET_KEY).userId
        const userId = 1; // test용
        const currentCart = await cartService.getCurrentCart(userId);

        return res.status(200).json(currentCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        // const { token } = req.headers
        const { productId } = req.params;
        const { quantity, setQuantity } = req.query;

        // const userId = jwt.verify(token, SECRET_KEY)
        const userId = 1; // test용
        const itemsInCart = await cartService.updateCart(
            productId,
            userId,
            quantity,
            setQuantity
        );

        return res.status(200).json({ currentCart: itemsInCart });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteItemFromCart = async (req, res) => {
    try {
        // const { token } = req.headers
        const { productId } = req.params;

        // const userId = jwt.verify(token, SECRET_KEY)
        const userId = 1; // test용
        const itemsInCart = await cartService.deleteItemFromCart(
            productId,
            userId
        );

        return res.status(200).json({ currentCart: itemsInCart });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const cleanCart = async (req, res) => {
    try {
        const userId = 7;
        await cartService.cleanCart(userId);

        return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getCurrentCart,
    updateCart,
    deleteItemFromCart,
    cleanCart,
};
