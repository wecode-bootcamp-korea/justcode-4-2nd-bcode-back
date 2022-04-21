

const validateForm = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "KEY_ERROR" });
        return;
    }
    next();
}

module.exports = { validateForm }