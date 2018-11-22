
const fetch = require('node-fetch');

module.exports = async (url) => {
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            return Promise.reject(new Error(
                `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
        });
};