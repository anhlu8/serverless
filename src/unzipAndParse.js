module.exports = async (event) => {
    console.log('inside unzipAndParse')
    fs.createReadStream('path/to/archive.zip')
        .pipe(unzipper.Parse()
            .on('entry', entry => entry.autodrain())
            .promise()
            .then(() => console.log('done'), e => console.log('error', e))
        )
}