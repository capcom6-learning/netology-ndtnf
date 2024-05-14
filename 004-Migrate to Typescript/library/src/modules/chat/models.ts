import { Schema, model } from "mongoose";

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

export const Comment = model("Comment", CommentSchema);
