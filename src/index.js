module.exports = {
    authenticate: require('./utils/authenticate'),
    getDB: require('./utils/getDB'),
    getFile: require('./utils/getFile'),
    jsonArrs: require('./utils/jsonArrs'),
    lamdaToSqs: require('./utils/lamdaToSqs'),
    saveToS3: require('./utils/saveToS3'),
    unzipAndParse: require('./utils/unzipAndParse'),
    resolvers: require('./server/resolvers'),
    worldGame: require('./utils/worldGame')
}