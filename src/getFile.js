const rp = require('request-promise');
// const lkAllianceUrl = process.env.LK_ALLIANCE_DATA_URL
const lkAllianceUrl = "https://www.google.com/";
module.exports = () => {
    const options = {
        uri: lkAllianceUrl
    };
    return rp(options)
        .then(function (res) {
            console.log('this is response from fetching', res);
        })
        .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`));
};
