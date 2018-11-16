const fs = require('fs');
// const strs = require('stringstream');
// const path = require('path');
const zlib = require('zlib');
const AWS = require('aws-sdk');

// AWS.config.setPromisesDependency();
const s3 = new AWS.S3();
// const bucket = process.env.BUCKET_NAME;

const test = async (event) => {
  const params = {
    Bucket: "anhredqueen",
    Key: 'alliances.json.gz',
  }
/*
DD: Can you show me what happens when you run it?
Anh: Ok! This is great with phone too, just fyi! :D
DD: Discord has voice chat we could use, also.
anh: Ok, do you want to use that? I don't know how
*/
  s3.getObject(params, async function (err, data) {
    if (err) {
      return console.log("Error in getObject", err)
    } else {
      const {Body} = data;

      const processUnzippedFile = async (err, decompressed) => {
        if (err) {
          console.log("Error in zlib.gunzip");
        }
        const asString = decompressed.toString();
        // console.log('Unzip', asString);
        const sentparams = {
          Bucket: "anhredqueen",
          Key: 'alliances.json',
          Body: asString
        }


        s3.putObject(sentparams, function (err, data) {
          if (err) {
            return console.log("Error in putObject", err)
          }
          return console.log("Success", data);
        });
      };

      zlib.gunzip(Body, processUnzippedFile);

      

      // const file = JSON.stringify(unzip);
      // const readFile = fs.createReadStream(file)

      // const sentparams = {
      //   Bucket: "anhredqueen",
      //   Key: 'alliances.json',
      //   Body: readFile
      // }

      // s3.putObject(sentparams, function (err, data) {
      //   if (err) {
      //     return console.log("Error in putObject", err)
      //   }
      //   return console.log("Success", data);
      // });

    }
  })

  // const isGzip = path.extname(params.Key) === ".gz";
  // let readStream = s3.getObject(params)
  // readStream = isGzip ? readStream.pipe(zlib.createGunzip()) : readStream;
  // console.log(readStream);

  // zlib.createGunzip(data.Body, (err, res) => {
  //   console.log(JSON.stringify(res));
  // })

  // const json = JSON.stringify(data.Body);
  // const test = JSON.parse(json)
  // console.log(test);

  // const fileContents = fs.createReadStream(data.Body);;
  // const unzip = zlib.createGunzip();
  // return fileContents.pipe(unzip);

  // const utf8Stream = fs.createReadStream(data)
  //   .pipe(zlib.createGunzip())
  //   .pipe(strs('utf8'))
  // utf8Stream.on('data', str => console.log(`This will be a string: ${str}`))
  // }
  // })
  // });



  //  This block of code below is to unzip multiple files in a directory
  // Promise.all(directoryFiles.map(filename => {
  //     return new Promise((resolve, reject) => {
  //       const fileContents = fs.createReadStream(`./data/${filename}`);
  //       const writeStream = fs.createWriteStream(`./data/${filename.slice(0, -3)}`);
  //       const unzip = zlib.createGunzip();
  //       fileContents.pipe(unzip).pipe(writeStream).on('finish', (err) => {
  //         if (err) return reject(err);
  //         else resolve();
  //       })
  //     })
  //   }))
  //     .then(console.log('done'));

  // context.callbackWaitsForEmptyEventLoop = false;
  // event.Records.forEach(record => {}
}

test();