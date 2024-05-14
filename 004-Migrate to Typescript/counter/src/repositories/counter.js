const sqlite3 = require("sqlite3").verbose();

const config = require("../config");

const db = new sqlite3.Database(config.STORAGE_PATH);
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS counters (
        id TEXT PRIMARY KEY,
        count INTEGER DEFAULT 0
    )`);
});

const get = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT count FROM counters WHERE id = ?", id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.count : 0);
            }
        });
    });
};

const incr = (id) => {
    return new Promise((resolve, reject) => {
        db.get("INSERT INTO counters (id, count) VALUES (?, 1) ON CONFLICT(id) DO UPDATE SET count = count + 1 RETURNING count", id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.count : 0);
            }
        });
    });
};

const close = () => {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    get,
    incr,
    close,
};