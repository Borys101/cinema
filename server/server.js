const express = require("express");
const app = express();
<<<<<<< HEAD
=======
const cors = require("cors");
>>>>>>> my-recovered-branch
require('dotenv').config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

<<<<<<< HEAD
=======
app.use(cors());

>>>>>>> my-recovered-branch
const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute")
const bookingsRoute = require("./routes/bookingsRoute")

app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingsRoute);

<<<<<<< HEAD
const port = process.env.PORT || 5000;
=======
const port = process.env.PORT || 4000;
>>>>>>> my-recovered-branch
app.listen(port, () => console.log(`Node JS Server is running on port ${port}`));