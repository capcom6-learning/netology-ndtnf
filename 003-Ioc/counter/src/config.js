require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    STORAGE_PATH: process.env.STORAGE_PATH || "storage/counter.db",
};