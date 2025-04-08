require('dotenv').config();
const express = require('express');
const app = express();

app.listen(3000, () => console.log("Server online at http://localhost:3000 !"))