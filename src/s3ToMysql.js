const mysql = require('mysql');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const Json2csvParser = require('json2csv').Parser;
const bucket = process.env.BUCKET_NAME;

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
        } else {
            const params = {
                Bucket: bucket,
                Key: 'alliances.csv',
                ExpressionType: 'SQL',
                Expression: 'SELECT user_name FROM S3Object WHERE cast(age as int) > 20',
                InputSerialization: {
                    CSV: {
                        FileHeaderInfo: 'USE',
                        RecordDelimiter: '\n',
                        FieldDelimiter: ','
                    }
                },
                OutputSerialization: {
                    CSV: {}
                }
            };
        }

    });
    connection.end();

}