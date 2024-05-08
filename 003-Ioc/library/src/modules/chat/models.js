const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        bookId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
        }
    }
);

const Comment = model("Comment", CommentSchema);

module.exports = {
    Comment
};