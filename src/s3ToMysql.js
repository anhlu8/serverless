const mysql = require('mysql');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;

module.exports = async (event, context, ) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const connection = mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        ssl: "Amazon RDS",
        database: process.env.RDS_DB,
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
                Expression: 'CREATE TABLE alliances (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id),lkname VARCHAR(100) NOT NULL,allianceID VARCHAR(100) NOT NULL)',
                InputSerialization: {
                    CSV: {
                        FileHeaderInfo: 'NONE',
                        RecordDelimiter: '\n',
                        FieldDelimiter: ','
                    }
                },
                OutputSerialization: {
                    CSV: {}
                }
            };
            s3.selectObjectContent(params, function(err, data) {
                if (err) console.log(err, err.stack);
                else     console.log(data); 
            })
        }

    });
    connection.end();

}