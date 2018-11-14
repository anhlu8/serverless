'use strict';
const {
  getFile,
  sqsToLambda,
  lamdaToSqs,
  saveToS3
} = require('./src');
const fetch = require('node-fetch');
const lkAllianceUrl = process.env.LK_ALLIANCE_DATA_URL

module.exports.launch = async (event, context) => {
  //1. Fetch to L&K page & parse file
  fetch(lkAllianceUrl)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
        `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(response => saveToS3(response))
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