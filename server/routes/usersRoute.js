const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

//реєстрація нового користувача
router.post('/register', async (req, res) => {
    try {
        //користувач вже існує
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: "Користувач вже існує"
            })
        }

        //хешування паролю
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //створення нового користувача
        const newUser = new User(req.body);
        await newUser.save();

        res.send({ success: true, message: "Користувач був успішно зареєстрований" })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//авторизація користувача
router.post("/login", async (req, res) => {
    try {
        //чи користувач вже зареєстрований
        const user = await User.findOne({ email: req.body.email});
        if (!user) {
            return res.send({
                success: false,
                message: "Користувач не зареєстрований"
            })
        }

        //перевірка коректності пароля
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Невірний пароль"
            })
        }
        //Створення токена
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d"
        });
        res.send({ success: true, message: "Користувач успішно авторизований" , data: token});
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//отримати дані користувача за id
router.get('/get-current-user', authMiddleware , async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select('-password');
        res.send({
            success: true,
            message: "Дані користувача успішно отримані",
            data: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Додати бали за купівлю квитків
router.post("/add-points", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        await User.findByIdAndUpdate(req.body.userId, { points: user.points + req.body.points });
        res.send({
            success: true,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.post("/remove-points", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        await User.findByIdAndUpdate(req.body.userId, { points: user.points - req.body.points });
        res.send({
            success: true,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;