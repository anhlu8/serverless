const AWS = require('aws-sdk');
// AWS.config.setPromisesDependency();
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;

module.exports = async (event) => {

    //this block of code below is to see all the files in the bucket
    // try{
    //     const response = await s3.listObjectsV2({
    //         Bucket: bucket
    //     }).promise();
    //     console.log(response);
    // } catch (e) {
    //     console.error("You made a mistake", e)
    // }
    // debugger;


    const params = {
        Bucket: bucket,
        Key: 'alliances.json.gz',
    }
    s3.getObject(params, function (err, data) {
        if (err === null) {
            // res.attachment('file.ext')
            // res.send(data.Body);
            return data;
         } else {
            res.status(500).send(err);
         }
     });
}
    
    

