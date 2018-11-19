const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;

module.exports = async (event) => {
    const params = {
        Bucket: bucket,
        Key: 'alliances.json.gz',
        Body: event
    }

    const putObjectPromise = s3.putObject(params).promise();
    await putObjectPromise
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            console.log(err);
        });
}
// Simplified Callback Method
// s3.putObject(params, function (err, data) {
//     if (err) {
//         return console.log("Error", err)
//     }
//     console.log("Success", data);
//     return resolve();
// });