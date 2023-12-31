const { readdirSync } = require("fs");
const path = require("path");
const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// routes middleware
readdirSync("./routes").map(r => app.use("/api/sales", require(`./routes/${r}`))) 




// server
const port = process.env.PORT || 8000;

// Connect to DB and start server
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));

