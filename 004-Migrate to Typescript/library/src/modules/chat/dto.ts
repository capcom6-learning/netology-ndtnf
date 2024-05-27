export interface CommentDto {
    text: string;
    bookId: string;
    author: string;
}

export interface NewCommentDto {
    text: CommentDto["text"];
    author: CommentDto["author"];
}