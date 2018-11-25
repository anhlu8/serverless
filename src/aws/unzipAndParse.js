require('dotenv').config()
const bucket = process.env.BUCKET_NAME;
const zlib = require('zlib');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();

module.exports = async (event) => {
  const params = {
    Bucket: bucket,
    Key: event,
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
          Key: `${event}.json`,
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