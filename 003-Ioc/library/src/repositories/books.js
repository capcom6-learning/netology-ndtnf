const { Schema, model, isValidObjectId } = require("mongoose");

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

const Book = model("Book", BookSchema);

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

const select = async () => {
    return await Book.find({});
};

const get = async (id) => {
    if (!isValidObjectId(id)) {
        throw new NotFoundError("Book not found");
    }

    return await Book.findById(id);
};

const insert = async (book) => {
    book = validate(book);

    return await Book.create(book);
}

const update = async (id, book) => {
    if (!isValidObjectId(id)) {
        throw new NotFoundError("Book not found");
    }

    const item = await Book.findOneAndUpdate(
        { _id: id },
        { $set: book },
        { new: true }
    );

    if (!item) {
        throw new NotFoundError("Book not found");
    }

    return item;
}

const remove = async (id) => {
    if (!isValidObjectId(id)) {
        return;
    }

    return await Book.deleteOne({ _id: id });
}

const validate = (book) => {
    const requiredFields = ["title", "description", "authors"];

    for (const field of requiredFields) {
        if (!book[field]) {
            throw new ValidationError(`"${field}" is required`);
        }
    }

    if (book.favorite !== undefined) {
        book.favorite = !!book.favorite;
    }

    return book;
}

module.exports = {
    select,
    get,
    insert,
    update,
    remove,
    NotFoundError,
    ValidationError,
};