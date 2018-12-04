module.exports = {
    getFile: require('./lambda/getFile'),
    lamdaToSqs: require('./lambda/lamdaToSqs'),
    saveToS3: require('./lambda/saveToS3'),
    unzipAndParse: require('./lambda/unzipAndParse'),
    resolvers: require('./graphqlapi/resolvers'),
    worldGame: require('./lambda/worldGame'),
    jsonArrs: require('./lambda/jsonArrs'),
    utils: require('./graphqlapi/utils'),
    getDB: require('./lambda/getDB')
}