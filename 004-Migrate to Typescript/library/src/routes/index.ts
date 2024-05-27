import express, { Router } from "express";
import { router as books } from "./books";
import { router as errors } from "./errors";
import { router as api } from "./api";

export const router = Router();

router.use("/", books);
router.use("/errors", errors);
router.use("/api", express.json(), api);
