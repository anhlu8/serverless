const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const Json2csvParser = require('json2csv').Parser;
const bucket = process.env.BUCKET_NAME;

module.exports = async (event, context, ) => {
    const params = {
        Bucket: bucket,
        Key: 'alliances.json',
    }
    s3.getObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
            const fields = ['id', 'name', 'pointsAverage'];
            const json2csvParser = new Json2csvParser({
                fields
            });
            const csv = json2csvParser.parse(data);
            const sentparams = {
                Bucket: bucket,
                Key: 'alliances.csv',
                Body: csv
            }
            s3.putObject(sentparams, function (err, data) {
                if (err) {
                    return console.log("Error in putObject", err)
                }
                return console.log("Success", data);
            });
        }
    });
}