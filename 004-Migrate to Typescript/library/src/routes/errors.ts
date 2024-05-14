import { Router } from "express";

export const router = Router();

router.get("/404", (req, res) => {
    res.status(404).render("errors/404");
});

router.get("/400", (req, res) => {
    res.status(400).render("errors/400");
});

router.get("/500", (req, res) => {
    res.status(500).render("errors/500");
});
