export class BookCommentDto {
    id: string;
    bookId: string;
    comment: string;

    constructor(partial: Partial<BookCommentDto>) {
        this.id = partial.id;
        this.bookId = partial.bookId;
        this.comment = partial.comment;
    }
}

export type CreateBookCommentDto = Omit<BookCommentDto, "id">;
