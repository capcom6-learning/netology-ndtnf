const config = require("./config");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

require('express-async-errors');

function setUpSocket(io) {
    io.on("connection", socket => {
        require("./modules/chat").registerSocketIO(io, socket);
    });
}

const start = async () => {
    console.log("MongoDB connecting...");
    await mongoose.connect(config.MONGO_URL);
    console.log("MongoDB connected");

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {});

    setUpSocket(io);

    app.set("view engine", "ejs");
    app.use("/", require("./routes"));

    httpServer.listen(
        config.PORT,
        () => {
            console.log(`Server started at http://127.0.0.1:${config.PORT}`);
        }
    );
}

const stop = () => {
    console.log("Server stopped");
    process.exit(0);
};

process.on('SIGINT', () => {
    stop();
});
process.on('SIGTERM', () => {
    stop();
});

start();