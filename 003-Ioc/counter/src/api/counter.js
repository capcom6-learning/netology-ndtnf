const router = require("express").Router();

const counter = require("../repositories/counter");

class CounterResponse {
    constructor(bookId, count) {
        this.bookId = bookId;
        this.count = count;
    }
}

router.get("/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const count = await counter.get(bookId);

    const response = new CounterResponse(bookId, count);
    res.json(response).end();
});

router.post("/:bookId/incr", async (req, res) => {
    const { bookId } = req.params;

    const count = await counter.incr(bookId);

    const response = new CounterResponse(bookId, count);
    res.json(response).end();
});

module.exports = router;
