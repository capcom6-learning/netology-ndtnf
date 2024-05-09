const { Container } = require("inversify");
const { BooksRepository } = require("./repositories/books");

const container = new Container();

container.bind(BooksRepository).toSelf();

module.exports = container;