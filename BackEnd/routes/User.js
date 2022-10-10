const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS users (fullName VARCHAR(255), userName VARCHAR(255), password VARCHAR(255))"
        connection.query(userTableQuery, function (err, result) {
            if (err) throw err;
            if (result.warningCount === 0) {
                console.log("User table created!");
            }
        })
    }
})

router.post('/', (req, res) => {
    console.log("Post Method In Express");
    const fullName = req.body.fullName
    const username = req.body.userName
    const password = req.body.password

    var query = "INSERT INTO users (fullName, userName,password) VALUES (?, ?, ?)";

    connection.query(query, [fullName, username, password], (err) => {
        if (err) {
            res.send({
                'status': '500',
                'message': 'duplicate entry'
            })
        } else {
            res.send({
                'status':'200',
                'message': 'user created!'
            })
        }
    })

})

router.get('/login/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    var query = "SELECT * FROM users WHERE userName=? AND password=?";

    connection.query(query, [username, password], (err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.send(row);
        }
    })
})


module.exports = router