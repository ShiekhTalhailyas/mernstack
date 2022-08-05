const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectedDB = require("./database/db");
const PORT = process.env.PORT;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

// connection to database
connectedDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//routes
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/tickets", require("./routes/ticketsRouter"));
app.listen(PORT, () => console.log(`Port ${PORT} is listening`));
