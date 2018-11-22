const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;
const sqs = new AWS.SQS();
const awsAccountId = process.env.AWS_ACCOUNTID;
const sqsQueueName = process.env.SQS_QUEUE_NAME;
const awsRegion = process.env.MY_AWS_REGION;
const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsAccountId}/${sqsQueueName}`;

module.exports = async (event) => {
    const { title, body } = event
    const params = {
        Bucket: bucket,
        Key: title,
        Body: body
    }

    await s3.putObject(params).promise()
        .then(async () => {
            const sentParams = {
                MessageBody: title,
                QueueUrl: queueUrl,
            };
            const putObjectPromise = sqs.sendMessage(sentParams).promise();
            await putObjectPromise
                .then(function (data) {
                    return data.MessageId ;
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}

