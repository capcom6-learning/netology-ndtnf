const characters = require('./characters.json');

module.exports.handler = async (event, context) => {
    const id = event.queryStringParameters.id;

    if (!id) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characters)
        };
    }

    const character = characters.find(c => c.id == id);
    if (!character) {
        return {
            statusCode: 404,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Not found' })
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(character)
    };
}