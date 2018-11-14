const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;

module.exports.lamdaToSQS = async (event) => {
    const params = {
        Bucket: bucket, 
        Key: 'alliances.json.gz', 
        Body: event.body}

    s3.putObject(params, function (err, data) {
        if (err) {
            return console.log("Error", err)
        }
        return console.log("Success", data);
    });
}


    
    

