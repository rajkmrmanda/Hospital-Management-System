const mysql = require('mysql');

// mysql configuration
exports.mySqlConfig = {
    host: "localhost",
    user: "root",
    password: "admin",
    database: 'hospital',
    port: 3307,
    multipleStatements: true
}

// helps to return connection
exports.getConnection = () => {
    return mysql.createConnection(this.mySqlConfig)
}

// helps to check connection
exports.checkConnection = () => {
    const conn = this.getConnection()
    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected  to database !");
    });
}