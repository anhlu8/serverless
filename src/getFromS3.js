const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;

module.exports = async (event) => {
    const params = {
        Bucket: bucket,
        Key: 'alliances.json.gz',
    }
    s3.getObject(params, function (err, data) {
        if (err) {
            return console.log("Error", err)
        }
        return console.log("Success", data);
    });
}