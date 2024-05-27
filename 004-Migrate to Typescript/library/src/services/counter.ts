import config from "../config";

const get = async (bookId: string): Promise<number> => {
    try {
        const url = `${config.COUNTER_URL}/api/counter/${bookId}`;
        const response = await fetch(url);
        const { count } = await response.json();
        return count;
    } catch (error) {
        return 0;
    }
};

const incr = async (bookId: string): Promise<number> => {
    try {
        const url = `${config.COUNTER_URL}/api/counter/${bookId}/incr`;
        const response = await fetch(url, {
            method: "POST",
        });
        const { count } = await response.json();
        return count;
    } catch (error) {
        return 0;
    }
};

export const CounterService = {
    get: get,
    incr: incr,
}