const router = require("express").Router();
const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");
const authMiddleware = require("../middlewares/authMiddleware");

//Додати новий кінотеатр
router.post("/add-theatre", authMiddleware, async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "Кінотеатр був доданий успішно"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Отримати усі кінотеатри
router.get("/get-all-theatres", authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Кінотеатри успішно завантажені",
            data: theatres
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Оновити інформацію про кінотеатр
router.post("/update-theatre", authMiddleware, async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        res.send({
            success: true,
            message: "Інформацію про кінотеатр успішно оновлено"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Видалити кінотеатр
router.post("/delete-theatre", authMiddleware, async (req, res) => {
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: "Кінотеатр успішно видалено"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Додати новий сеанс
router.post("/add-show", authMiddleware, async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success: true,
            message: "Новий сеанс успішно додано"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Отримати усі сеанси у театрі
router.post("/get-all-shows-by-theatre", authMiddleware, async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.body.theatreId }).populate('movie').sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Сеанси успішно отримані",
            data: shows
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Видалити сеанс
router.post('/delete-show', authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId);
        res.send({
            success: true,
            message: "Сеанс був успішно видалений"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Отримати усі унікальні театри, які мають сеанси кіно
router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
    try {
        const { movie, date } = req.body;

        const shows = await Show.find({ movie, date })
            .populate("theatre")
            .sort({ createdAt: -1 });
        let uniqueTheatres = [];
        shows.forEach((show) => {
            console.log(shows);
            const theatre = uniqueTheatres.find(
                (theatre) => theatre._id == show.theatre._id
            );
            if (!theatre) {
                const showsForThisTheatre = shows.filter(
                    (showObj) => showObj.theatre._id == show.theatre._id
                );
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsForThisTheatre,
                });
            }
        });

        res.send({
            success: true,
            message: "Театри були успішно отримані",
            data: uniqueTheatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//Отримати шоу за id
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById(req.body.showId).populate("movie").populate("theatre");
        res.send({
            success: true,
            message: "Дані про шоу успішно завантажені",
            data: show
        })
    } catch (error) {
        res.send({
            message: false,
            message: error.message
        })
    }
})
module.exports = router;