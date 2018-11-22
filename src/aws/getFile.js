
const fetch = require('node-fetch');

module.exports = async (data) => {
    return fetch(data.url)
        .then((response) => {
            if (response.ok) {
                const zippedFile = {
                    'title': data.title,
                    'body':response
                };
                return zippedFile;
            }
            return Promise.reject(new Error(
                `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
        });
};