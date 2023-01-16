const express = require("express");
const { transports, format, error, level } = require("winston");
const expressWinston = require("express-winston");

require("dotenv").config();
require("winston-mongodb");

const errLogger = expressWinston.logger({
  transports: [
    new transports.MongoDB({
      db: process.env.DB_URL,
      level: "error",
    }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
  statusLevels: true,
});

module.exports = { errLogger };
