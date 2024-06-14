const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMiddleWare = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

//Оплатити
router.post("/make-payment", authMiddleWare, async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({ email: token.email, source: token.id });
        const charge = await stripe.charges.create({
            amount,
            currency: "uah",
            customer: customer.id,
            receipt_email: token.email,
            description: "Купівля квитка"
        }, { idempotencyKey: Math.random().toString(36).substring(7) });

        const transactionId = charge.id;
        res.send({
            success: true,
            message: "Оплата пройшла успішно",
            data: transactionId

        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

//Зарезервувати шоу
router.post("/book-show", authMiddleWare, async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show);
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: [...show.bookedSeats, ...req.body.seats],
        });

        res.send({
            success: true,
<<<<<<< HEAD
            message: "Show booked successfully",
=======
            message: "Квитки успішно заброньовані",
>>>>>>> my-recovered-branch
            data: newBooking,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//Отримати усі бронювання людини
router.get("/get-bookings", authMiddleWare, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId }).populate("show").populate({
            path: "show",
            populate: {
                path: "movie",
                model: "movies"
            }
        }).populate("user").populate({
            path: "show",
            populate: {
                path: "theatre",
                model: "theatres"
            }
        });
        res.send({
            success: true,
            message: "Бронювання успішно отримані",
            data: bookings
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;