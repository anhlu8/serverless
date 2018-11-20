const lkAllianceUrl = process.env.LK_ALLIANCE_US1;
const fetch = require('node-fetch');

module.exports = async () => {
    return fetch(lkAllianceUrl)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            return Promise.reject(new Error(
                `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
        });
};