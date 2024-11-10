const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const db = require("./database");
// console.log('DB instance in server:', db);

// const mysql = require('mysql2');
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'CRUDDB'
// });

const userRoutes = require('./Routes/user_route');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api_n_tier', userRoutes)


app.get('/api/read', async (req, res) => {
    const sqlRead = "SELECT * FROM users";
    // db.query(sqlRead, (err, result) => {
    //     res.send(result);
    // });
    try {
        const [rows] = await db.query(sqlRead);
        res.json(rows);
    } catch (err){
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    }
});

app.post('/api/create', async (req, res) => {
    const createEmail = req.body.email;
    const createPWD = req.body.password;

    const sqlCreate = "INSERT INTO users (email, password) VALUES (?,?)";
    // db.query(sqlCreate, [createEmail, createPWD], (err, result) => {
    //     console.log(result);
    // });
    try {
        const [result] = await db.query(sqlCreate,[createEmail, createPWD]);
        console.log(result);
    } catch (err){
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    }
});

app.get('/', (req,res) => {
    // const sqlInsert = "INSERT INTO users (email, password) VALUES ('manual','asd123');"
    // db.query(sqlInsert, (err, result) => {
    //     res.send("Default Inserted.")
    // })
});

app.listen(port, () => {
    console.log(`running on port ${port}`)
});