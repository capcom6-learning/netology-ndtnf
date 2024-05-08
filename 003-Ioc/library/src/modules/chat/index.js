const { RES_CHAT_HISTORY, REQ_SEND_MESSAGE, RES_NEW_MESSAGE } = require("./events");
const { selectByBookId, insert } = require("./repository");

const registerSocketIO = async (io, socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });

    const bookId = socket.handshake.query.bookId;
    if (!bookId) {
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

module.exports = {
    registerSocketIO
};