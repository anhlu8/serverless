// const rp = require('request-promise');
// const lkAllianceUrl = process.env.LK_ALLIANCE_DATA_URL
// const lkAllianceUrl = "https://www.google.com/";
const fetch = require('node-fetch');
const lkAllianceUrl = process.env.LK_ALLIANCE_DATA_URL

module.exports = () => {
    // const options = {
    //     uri: lkAllianceUrl
    // };
    // return rp(options)
    //     .then(function (res) {
    //         console.log('this is response from fetching', res);
    //     })
    //     .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`));
    fetch(lkAllianceUrl)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            return Promise.reject(new Error(
                `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
        })
};