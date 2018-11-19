module.exports = {
    getFile: require('./getFile'),
    saveToS3: require('./saveToS3'),
    sqsToLambda: require('./sqsToLambda'),
    lamdaToSqs: require('./lamdaToSqs'),
    unzipAndParse: require('./unzipAndParse'),
    s3ToMysql: require('./s3ToMysql')
}