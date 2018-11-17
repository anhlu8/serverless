const mysql = require('mysql');

module.exports = async (event, context, ) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const connection = mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        ssl: "Amazon RDS",
        database: process.env.RDS_DATABASE,
        connectTimeout: 3000,
    });

    connection.connect(function (err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        console.log('Connected to database.');
    });
    connection.end();

}