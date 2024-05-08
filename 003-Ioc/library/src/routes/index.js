const express = require("express");

const router = require("express").Router();

router.use("/", require("./books"));
router.use("/errors", require("./errors"));
router.use("/api", express.json(), require("./api"));

module.exports = router;