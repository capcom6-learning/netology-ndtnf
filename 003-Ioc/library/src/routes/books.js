const upload = require("../middleware/upload");

const books = require("../repositories/books");
const { Books } = require("../services");

const router = require("express").Router();

const handleError = (res, error) => {
    if (error instanceof books.NotFoundError) {
        res.redirect("/errors/404");
        return;
    }

    if (error instanceof books.ValidationError) {
        res.redirect("/errors/400");
        return;
    }

    console.error(error);
    res.redirect("/errors/500");
}

router.get("/", async (req, res) => {
    const items = await Books.select();
    res.render("books/index", { books: items });
});

router.get("/new", async (req, res) => {
    res.render("books/create", { book: {} });
});

router.get("/:id", async (req, res) => {
    const book = await Books.get(req.params.id, { incrCounter: true });
    res.render("books/view", { book });
});

router.get("/:id/edit", async (req, res) => {
    const book = await Books.get(req.params.id);
    res.render("books/update", { book });
});

router.post("/save", upload.single("fileBook"), async (req, res) => {
    try {
        await Books.insert({
            ...req.body,
            fileBook: req.file ? req.file.filename : null,
        });
    } catch (error) {
        if (error instanceof books.ValidationError) {
            res.render("books/update", { book: req.body });
            return;
        }

        throw error;
    }

    res.redirect(`/`);
});


router.post("/save/:id", upload.single("fileBook"), async (req, res) => {
    const data = {
        ...req.body,
    };

    if (req.file) {
        data.fileBook = req.file.filename;
    }

    try {
        await Books.update(req.params.id, data);
    } catch (error) {
        if (error instanceof books.ValidationError) {
            res.render("books/update", { book: req.body });
            return;
        }

        throw error;
    }

    res.redirect(`/`);
});

router.get("/:id/delete", async (req, res) => {
    const book = await Books.get(req.params.id);

    res.render("books/delete", { book });
});

router.post("/:id/delete", async (req, res) => {
    await Books.remove(req.params.id);
    res.redirect("/");
});

router.use((err, req, res, next) => {
    handleError(res, err);
});

module.exports = router;