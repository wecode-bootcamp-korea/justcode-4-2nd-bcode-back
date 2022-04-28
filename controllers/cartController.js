const jwt = require('jsonwebtoken');
const cartService = require('../services/cartService');
const userService = require('../services/userService');

const getCurrentCart = async (req, res) => {
    try {
        const token = await req.headers.authorization;

        if (!token) {
            throw await res
                .status(200)
                .json({ message: 'NEED_TO_LOGIN', currentCart: [] });
        }

        const { email } = jwt.verify(token, process.env.SECRET_KEY);
        const findUser = await userService.getUserInfo(email);
        userId = findUser[0].id;

        const currentCart = await cartService.getCurrentCart(userId);

        return res.status(200).json(currentCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity, setQuantity } = req.query;

        if (!productId || !quantity || !setQuantity) {
            return res.status(400).json({
                message: 'MISSING_PRODUCTID_OR_QUANTITY_OR_SETQUANTITY',
            });
        }

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
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: 'MISSING_PRODUCTID' });
        }

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
