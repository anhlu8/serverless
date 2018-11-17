// const fs = require('fs');
// const strs = require('stringstream');
// const path = require('path');
const bucket = process.env.BUCKET_NAME;
const zlib = require('zlib');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = async (event) => {
  const params = {
    Bucket: bucket,
    Key: 'alliances.json.gz',
  }
  s3.getObject(params, async function (err, data) {
    if (err) {
      return console.log("Error in getObject", err)
    } else {
      const {Body} = data;
      const processUnzippedFile = async (err, decompressed) => {
        if (err) {
          console.log("Error in zlib.gunzip");
        }
        const asString = decompressed.toString();
        const sentparams = {
          Bucket: bucket,
          Key: 'alliances.json',
          Body: asString
        }
        s3.putObject(sentparams, function (err, data) {
          if (err) {
            return console.log("Error in putObject", err)
          }
          return console.log("Success", data);
        });
      };

      zlib.gunzip(Body, processUnzippedFile);

    }
  })
}

  //  This block of code below is to unzip multiple files in a directory
  // Promise.all(directoryFiles.map(filename => {
  //     return new Promise((resolve, reject) => {
  //       const fileContents = fs.createReadStream(`./data/${filename}`);
  //       const writeStream = fs.createWriteStream(`./data/${filename.slice(0, -3)}`);
  //       const unzip = zlib.createGunzip();
  //       fileContents.pipe(unzip).pipe(writeStream).on('finish', (err) => {
  //         if (err) return reject(err);
  //         else resolve();
  //       })
  //     })
  //   }))
  //     .then(console.log('done'));
  //********/
  // context.callbackWaitsForEmptyEventLoop = false;
  // event.Records.forEach(record => {})