const { isValidObjectId } = require("mongoose");

const { Comment } = require("./models");

const selectByBookId = async (bookId) => {
    if (!isValidObjectId(bookId)) {
        return [];
    }

    const comments = await Comment.find({ bookId }, null, { sort: { created_at: 1 } });
    return comments;
};

const insert = async (bookId, { author, text }) => {
    const comment = new Comment({
        bookId,
        author,
        text
    });
    await comment.save();
    return comment;
}

module.exports = {
    selectByBookId,
    insert
};