const express = require("express");
const { routeFibo } = require("./route");

const app = express();

app.get("/fibo/:number", routeFibo);
