// Create instance of express lib
const express = require("express")
const app = express()

//Import mysql
const mysql = require("mysql")

// Cors
const cors = require("cors")
app.use(cors())
app.use(express.json()) //json parser

// Database connection used for all functions
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'shankai123',
    database: 'employeeSystem'
})

// POST req - create route called create
app.post('/create', (req, res) => {
    console.log(req.body)
    // Get variables from front end
    const name = req.body.name //req.body.[variable name]
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

    // insert sql statement
    // each variable inthe array in the 2nd arg will replace the ?
    // 3rd arg is a callback function to call once query is done
    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', 
    [name, age, country, position, wage], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // Put the message into the result of the post
            res.send("Values inserted")
        }
    }) 
}) 

// GET req at /employee endpoint
app.get('/employee', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


app.listen(3001, () => {
    console.log("Yay the server is running yo on port 3001")
})

