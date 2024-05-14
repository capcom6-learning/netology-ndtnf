const { COUNTER_URL } = require("../config");

const get = async (bookId) => {
    try {
        const url = `${COUNTER_URL}/api/counter/${bookId}`;
        const response = await fetch(url);
        const { count } = await response.json();
        return count;
    } catch (error) {
        return 0;
    }
};

const incr = async (bookId) => {
    try {
        const url = `${COUNTER_URL}/api/counter/${bookId}/incr`;
        const response = await fetch(url, {
            method: "POST",
        });
        const { count } = await response.json();
        return count;
    } catch (error) {
        return 0;
    }
};

module.exports = {
    get,
    incr,
};
