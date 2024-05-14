import { Server, Socket } from "socket.io";

import { RES_CHAT_HISTORY, REQ_SEND_MESSAGE, RES_NEW_MESSAGE } from "./events";
import { selectByBookId, insert } from "./repository";

export const registerSocketIO = async (io: Server, socket: Socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });

    const bookId = socket.handshake.query.bookId;
    if (!bookId || typeof bookId !== "string") {
        return;
    }
    socket.join(bookId);

    console.log(`Socket ${socket.id} joined to ${bookId}`);

    socket.on(REQ_SEND_MESSAGE, async ({ author, text }) => {
        const comment = await insert(bookId, { author, text });
        io.to(bookId).emit(RES_NEW_MESSAGE, comment);
    });

    socket.emit(RES_CHAT_HISTORY, await selectByBookId(bookId));
};
