import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/books");
    },
    filename: (req, file, cb) => {
        const targetName = `${Date.now()}-${file.originalname}`;
        cb(null, targetName);
    },
});

const allowedTypes = [
    "text/plain",
    "application/pdf",
    "text/fb2+xml",
    "image/vnd.djvu",
];

const fileFilter = (eq: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export default multer({
    storage: storage,
    fileFilter: fileFilter,
});