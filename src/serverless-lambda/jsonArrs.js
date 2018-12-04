require('dotenv').config()
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;
const titles = ['209-alliances.json', '209-players.json', '209-habitats.json']

const jsonArrs = async () => {
    const promises = titles.map(async (title) => {
        let params = {
            Bucket: bucket,
            Key: title,
        };

        let { Body } = await s3.getObject(params).promise();
        let list = await JSON.parse(Buffer.from(Body).toString("utf8"));
        return {
            title: title,
            list: list};
    })
    const results = await Promise.all(promises);
    return results;
};

module.exports = jsonArrs;

//The block of code below is to update S3's CORS if needed:
//<CORSConfiguration>
//  <CORSRule>
//  <AllowedOrigin>*</AllowedOrigin>
//  <AllowedMethod>GET</AllowedMethod>
//  <AllowedMethod>PUT</AllowedMethod>
//  <AllowedMethod>POST</AllowedMethod>
//  <AllowedMethod>DELETE</AllowedMethod>
//  <AllowedHeader>*</AllowedHeader>
// </CORSRule>
// </CORSConfiguration>