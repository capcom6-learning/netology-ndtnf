import { injectable } from "inversify";
import { Schema, model, isValidObjectId, Document } from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    fileCover: {
        type: String,
        required: false
    },
    fileName: {
        type: String,
        required: false
    },
    fileBook: {
        type: String,
        required: false
    },
});

interface Book {
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover?: string;
    fileName?: string;
    fileBook?: string;
}

const BookModel = model<Book & Document>("Book", BookSchema);

interface EditBookDto {
    title: Book["title"];
    description: Book["description"];
    authors: Book["authors"];
    favorite?: Book["favorite"];
    fileCover?: Book["fileCover"];
    fileName?: Book["fileName"];
    fileBook?: Book["fileBook"];
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

const select = async () => {
    return await BookModel.find({});
};

const get = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new NotFoundError("Book not found");
    }

    return await BookModel.findById(id);
};

const insert = async (book: EditBookDto) => {
    book = validate(book);

    return await BookModel.create(book);
}

const update = async (id: string, book: EditBookDto) => {
    if (!isValidObjectId(id)) {
        throw new NotFoundError("Book not found");
    }

    const item = await BookModel.findOneAndUpdate(
        { _id: id },
        { $set: book },
        { new: true }
    );

    if (!item) {
        throw new NotFoundError("Book not found");
    }

    return item;
}

const remove = async (id: string) => {
    if (!isValidObjectId(id)) {
        return;
    }

    return await BookModel.deleteOne({ _id: id });
}

const validate = (book: EditBookDto) => {
    if (!book.title) {
        throw new ValidationError('"title" is required');
    }

    if (!book.description) {
        throw new ValidationError('"description" is required');
    }

    if (!book.authors) {
        throw new ValidationError('"authors" is required');
    }

    if (book.favorite !== undefined) {
        book.favorite = !!book.favorite;
    }

    return book;
}

@injectable()
export class BooksRepository {
    select = select;
    get = get;
    insert = insert;
    update = update;
    remove = remove;
}
