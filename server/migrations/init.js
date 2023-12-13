const fs = require('fs');
const path = require('path');
const mysql = require('mysql');


// statically types address need to chang it 
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    port: 3307,
    multipleStatements: true
})


const createDatabase = (conn) => {

    // sql statement
    let sqlStatement = "CREATE DATABASE hospital;"

    // sql query.
    return new Promise((resolve, reject) => {
        conn.query(sqlStatement, (error, results, fields) => {
            if (error) {
                console.log(error)
                return resolve(false)
            };
            return resolve(true)
        })
    })
}

const initialMigration = (conn) => {
    const users = fs.readFileSync(path.join(__dirname, '../intial_migration.sql')).toString();
    const query = conn.query(users, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log("completed initial migration")
        }

    });
}

// create database 
console.log("intiated")
createDatabase(conn).then(ans => {

    if (ans) {
        // change the conn with database
        const conn_with_database = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "admin",
            port: 3307,
            database: 'hospital',
            multipleStatements: true
        })

        // do initial commit
        initialMigration(conn_with_database)

    }
    console.log(ans)
}


).catch(err => console.log(err))