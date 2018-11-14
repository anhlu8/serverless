'use strict';
const {
  getFile,
  sqsToLambda,
  lamdaToSqs,
} = require('./src');
const rp = require('request-promise');
// const lkAllianceUrl = process.env.LK_ALLIANCE_DATA_URL
const lkAllianceUrl = "https://www.google.com/";

module.exports.launch = async (event, context) => {
  //1. Fetch to L&K page & parse file
  const options = {
    uri: lkAllianceUrl
  };
  return rp(options)
    .then(function (res) {
      console.log('this is response from fetching', res);
    })
    // .then(res => lamdaToSqs(res))
    // .then(res => sqsToLambda(res))
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Your function executed successfully!',
        })
      };
    })
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
};