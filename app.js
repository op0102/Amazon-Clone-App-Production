require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const PORT = process.env.PORT || 8005;
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
//   });





app.use(cors());
app.use(express.json());
app.use(cookieParser(""));
app.use(morgan("dev"));


app.use(router);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});





app.get("/", (req, res) => {
    res.send("Hi! I am Omprakash Live in Amazon Clone")
});

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        app.listen(PORT, () => {
            console.log(`${PORT} Yes i am connected`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();
