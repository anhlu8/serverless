const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
AWS.config.setPromisesDependency(Promise);
const awsAccountId = process.env.AWS_ACCOUNTID;
const sqsQueueName = process.env.SQS_QUEUE_NAME;
const awsRegion = process.env.MY_AWS_REGION;
const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsAccountId}/${sqsQueueName}`;

module.exports = async () => {
    // This is Promise Method
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
    //This block of code is Simplified Callback Method
    // sqs.sendMessage(sentParams, function (err, data) {
    //     if (err) {
    //         console.log('error:', 'Fail send message' + err);
    //     } else {
    //         console.log('data:', data.MessageId);
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({
    //                 message: 'Msg has been sent successfully!',
    //                 input: event,
    //             }),
    //         };
    //     }
    // });