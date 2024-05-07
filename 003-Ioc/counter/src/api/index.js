const router = require("express").Router();

router.use("/counter", require("./counter"));

module.exports = router;
