const router = require('express').Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");

//Додати новий фільм
router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Фільм успішно додано"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Отримати всі фільми
router.get("/get-all-movies", async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Фільми успішно завантажені",
            data: movies
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Редагувати інформацію про фільм
router.post("/update-movie", authMiddleware, async (req, res) => { 
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Дані про фільм успішно оновлені"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Видалити фільм
router.post("/delete-movie", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: "Фільм було успішно видалено"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Отримати фільм за id
router.get("/get-movie-by-id/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Фільм успішно отримано",
            data: movie
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})
module.exports = router;