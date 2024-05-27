require("reflect-metadata");
import { Container } from "inversify";
import { BooksRepository } from "./repositories/books";

const container = new Container();

container.bind(BooksRepository).toSelf();

export default container;