const mysql = require('mysql');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;
const {
    getFile,
    sqsToLambda,
    lamdaToSqs,
    saveToS3,
    getFromS3,
    unzipAndParse
  } = require('./src');

module.exports = async (event, context, ) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const connection = mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        ssl: "Amazon RDS",
        database: process.env.RDS_DATABASE,
        connectTimeout: 3000,
    });

    connection.connect(function (err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }else{
            getFromS3()
            .then(res => {
                
            })
        }

    });
    connection.end();

}

// const params = {
//     Bucket: bucket,
//     Key: 'alliances.json.gz',
//     ExpressionType: 'SQL',
//     Expression: 'SELECT * FROM allData',
//     InputSerialization: {
//         JSON: {
//             Type: "DOCUMENT"
//         },
//     },
//     OutputSerialization: {
//         JSON: {
//             RecordDelimiter: '\n'
//         }
//     }
// };
// s3.selectObjectContent(params, function (err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response
// });