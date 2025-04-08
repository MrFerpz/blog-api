require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router')

// necessary lines for correct data-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

app.listen(3000, () => console.log("Server online at http://localhost:3000 !"))