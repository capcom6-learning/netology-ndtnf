import fs from "fs";

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import upload from "../../middleware/upload";

import { NotFoundError, ValidationError } from "../../repositories/books";
import { Books } from "../../services";

export const router = require("express").Router();

const handleError = (res: Response, error: Error) => {
    if (error instanceof NotFoundError) {
        res.status(404).json({
            error: error.message,
        });
        return;
    }

    if (error instanceof ValidationError) {
        res.status(400).json({
            error: error.message,
        });
        return;
    }

    console.error(error);
    res.status(500).json({
        error: error.message,
    });
}

router.get("/", async (req: Request, res: Response) => {
    const data = await Books.select();

    res.json(data).end();
});

router.get("/:id", async (req: Request, res: Response) => {
    const data = await Books.get(req.params.id, { incrCounter: true });

    res.json(data).end();
});

router.get("/:id/download", async (req: Request, res: Response) => {
    const book = await Books.get(req.params.id);
    if (!book.fileBook) {
        res.status(404).json({
            error: "File is not attached",
        }).end();
        return;
    }

    const fullPath = `./public/books/${book.fileBook}`;
    if (!fs.existsSync(fullPath)) {
        res.status(404).json({
            error: "Book file not found",
        }).end();
        return;
    }

    res.download(`./public/books/${book.fileBook}`);
});

router.post("/", upload.single("fileBook"), async (req: Request, res: Response) => {
    const book = await Books.insert({
        ...req.body,
        fileBook: req.file ? req.file.filename : null,
    });

    res.status(201).json(book).end();
});

router.put("/:id", upload.single("fileBook"), async (req: Request, res: Response) => {
    const data = {
        ...req.body,
        fileBook: req.file ? req.file.filename : null,
    };
    const book = await Books.update(req.params.id, data);

    res.json(book).end();
});

router.delete("/:id", async (req: Request, res: Response) => {
    await Books.remove(req.params.id);
    res.status(200).send("ok").end();
    // res.status(204).end();
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    handleError(res, err);
};
router.use(errorHandler);
