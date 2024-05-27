import { isValidObjectId } from "mongoose";

import { Comment } from "./models";
import { NewCommentDto } from "./dto";

export const selectByBookId = async (bookId: string) => {
    if (!isValidObjectId(bookId)) {
        return [];
    }

    const comments = await Comment.find({ bookId }, null, { sort: { created_at: 1 } });
    return comments;
};

export const insert = async (bookId: string, data: NewCommentDto) => {
    const comment = new Comment({
        bookId,
        author: data.author,
        text: data.text,
    });
    await comment.save();
    return comment;
}
