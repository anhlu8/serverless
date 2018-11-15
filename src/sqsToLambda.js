const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const awsAccountId = process.env.AWS_ACCOUNTID;
const sqsQueueName = process.env.SQS_QUEUE_NAME;
const awsRegion = process.env.MY_AWS_REGION;
const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsAccountId}/${sqsQueueName}`;

module.exports = async (event, context) => {
    const receivedParams = {
        QueueUrl: queueUrl,
        WaitTimeSeconds:5
    };

    sqs.receiveMessage(receivedParams, function (err, data) {
        event.Records.forEach(({
            body
        }) => {
            console.log('inside receiveMessage',body);
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            })
        };
    });
};