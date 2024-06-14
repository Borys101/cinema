const router = require("express").Router();
const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");
<<<<<<< HEAD
=======
const Movie = require("../models/movieModel");
>>>>>>> my-recovered-branch
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
<<<<<<< HEAD
        const theatres = await Theatre.find().populate("owner").sort({ createdAt: -1 });
=======
        const theatres = await Theatre.find().sort({ createdAt: -1 });
>>>>>>> my-recovered-branch
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

<<<<<<< HEAD
//Отримати кінотеатри, додані користувачем
router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find({ owner: req.body.owner }).sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Кінотеатри були успішно отримані",
            data: theatres
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

=======
>>>>>>> my-recovered-branch
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
<<<<<<< HEAD
            message: false,
=======
            success: false,
            message: error.message
        })
    }
})

router.get("/get-all-shows-with-discount", authMiddleware, async (req, res) => {
    try {
        const shows = await Show.find({ discount: { $gt: 0 } });
        const showsWithPoster = [];

        for (const show of shows) {
            const movie = await Movie.findById(show.movie);
            showsWithPoster.push({
                ...show,
                poster: movie ? movie.poster : null
            });
        }
        res.send({
            success: true,
            message: "Сеанси зі знижкою успішно завантажені",
            data: showsWithPoster
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post("/change-discount", authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndUpdate(req.body.showId, { discount: req.body.discount });

        res.send({
            success: true,
            message: "Знижка успішно встановлена"
        })
    } catch (error) {
        res.send({
            success: false,
>>>>>>> my-recovered-branch
            message: error.message
        })
    }
})
module.exports = router;