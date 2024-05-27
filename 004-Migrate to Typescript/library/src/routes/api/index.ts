import { Router } from "express";

import { router as books } from "./books";
import { router as user } from "./user";

export const router = Router();

router.use("/books", books);
router.use("/user", user);
