require('dotenv').config()
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
AWS.config.setPromisesDependency(Promise);
const awsAccountId = process.env.AWS_ACCOUNTID;
const sqsQueueName = process.env.SQS_QUEUE_NAME;
const awsRegion = process.env.MY_AWS_REGION;
const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsAccountId}/${sqsQueueName}`;

module.exports = async (data) => {
    console.log('inside sqs', data)
    const sentParams = {
        MessageBody: "this is message sent",
        QueueUrl: queueUrl,
    };
    const putObjectPromise = sqs.sendMessage(sentParams).promise();
    await putObjectPromise
        .then(function (data) {
            return data.MessageId;
        })
        .catch(function (err) {
            console.log(err);
        });
};