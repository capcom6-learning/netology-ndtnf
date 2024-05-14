const router = require("express").Router();

router.use("/books", require("./books"));
router.use("/user", require("./user"));

module.exports = router;