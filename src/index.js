module.exports = {
    getFile: require('./serverless-lambda/getFile'),
    lamdaToSqs: require('./serverless-lambda/lamdaToSqs'),
    saveToS3: require('./serverless-lambda/saveToS3'),
    unzipAndParse: require('./serverless-lambda/unzipAndParse'),
    resolvers: require('./graphql-server/resolvers'),
    worldGame: require('./serverless-lambda/worldGame')
}