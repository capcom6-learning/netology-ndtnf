const express = require("express");

const config = require("./config");
const counter = require("./repositories/counter");

const app = express();

app.use('/api', express.json(), require('./api'));

const stop = async () => {
    await counter.close();
    console.log("Server stopped");
    process.exit(0);
};

process.on('SIGINT', async () => {
    await stop();
});
process.on('SIGTERM', async () => {
    await stop();
});

app.listen(config.PORT, () => {
    console.log(`Server started at http://127.0.0.1:${config.PORT}`);
});