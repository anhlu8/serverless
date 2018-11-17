const mysql = require('mysql');
const AWS = require('aws-sdk');

module.exports = async (event, context,) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const signer = new AWS.RDS.Signer({
        credentials: new AWS.SharedIniFileCredentials({
            profile: 'default'
        }),
        region: '',
        hostname: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        username: process.env.RDS_USERNAME,
        ssl: "Amazon RDS"
    });

    signer.getAuthToken({}, function (err, token) {
        console.log(token);
        const connection = mysql.createConnection({
            host: process.env.RDS_HOSTNAME,
            user: process.env.RDS_USERNAME,
            password: token,
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
    });
}

// module.exports = async (event, context) => {
//     //prevent timeout from waiting event loop
//     context.callbackWaitsForEmptyEventLoop = false;

// const pool = mysql.createPool({
//     host: process.env.RDS_HOSTNAME,
//     user: process.env.RDS_USERNAME,
//     password: process.env.RDS_PASSWORD,
//     port: process.env.RDS_PORT,
//     database: process.env.RDS_DATABASE,
//     connectTimeout: 3000,
// });
//     pool.getConnection(function (err) {
//         if (err) {
//             connection.destroy();
//             throw error;
//         } else {
//             afterConnection();
//         }

//     });

//     function afterConnection() {
//         connection.query("SELECT * FROM products", function (err, res, fields) {
//             connection.release();
//             console.log(res);
//             if (err) throw err;
//             // else callback(null,res[0].emp_name);
//             connection.end();
//         });
//     }

/* Initialization part starts here */
// const mysql      = require('mysql')
// const connection = mysql.createConnection({
//   host     : process.env.MYSQL_HOST,
//   user     : process.env.MYSQL_USER,
//   password : process.env.MYSQL_PASSWORD,
//   database : process.env.MYSQL_DB
// })
// /* Initialization part ends here */

// /* Handler function starts here */
// exports.handler = (event, context, callback) => {
//   const sql = 'SELECT * FROM users WHERE id = ' + connection.escape(event.userId)
//   connection.query(sql, function (error, results, fields) {
//     if (error) {
//       return callback(error)
//     }
//     callback(null, results)
//   })
// }
/* Handler function ends here */
// }