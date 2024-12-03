const express = require('express'); //creating a variable called express and will require the express middleware

const bodyParser = require('body-parser');
const cors = require('cors');


//gonna create an app thru that express variable
const app = express();

const mysql = require('mysql2');

//to create a database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cruddatabase',
});

//apply the middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))



//app.get('/', (req, res) => {

    
    //let's add random commands into our database
    //const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception','good movie');";

    /*
    db.query(sqlInsert, (err, result) => {
        //we're inserting the movie review into database and
        //whenevr we insert, we wanna call a function that renders it into the frontend

        res.send("Hello Kelvin");

        */
       /*
        db.query(sqlInsert, (err, result) => {
            if (err) {
                console.error("Error executing query:", err); // Log the error
                res.status(500).send("Database error occurred"); // Respond with a failure status
            } else {
                console.log("Query result:", result); // Log the query result
                res.send("Row inserted successfully!");
            }
        });
        */
       /*
        db.query(sqlInsert, (err, result) => {
            if (err) {
                console.error("SQL Error:", err.code, err.sqlMessage); // Log detailed error
                res.status(500).send("Database error occurred: " + err.sqlMessage);
                return; // Exit the function if there's an error
            }
            console.log("Query result:", result); // Log the query result
            res.send("Row inserted successfully!");
        }); // very important, used with chatgpt //didn't work because it wasn't mysql2
        


}); 
*/

app.get('/api/get', (req,res)=> {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
    
        //console.log(result);
        res.send(result);
    
        });
    
});

app.post("/api/insert", (req, res) => {
//we have vars for req res, we can just use it to get names
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    
    console.log(result);

    });
});

app.delete('/api/delete/:movieName', (req,res)=> {
    const name = req.params.movieName;
    const sqlDelete = 
    "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) => {

        if(err) console.log(err);
    });
});

app.put('/api/update', (req,res)=> {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = 
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, result) => {

        if(err) console.log(err);
    });
});

//we wanna listen to it so
app.listen(3001, () => {
    console.log("running on port 3001");
}); //react app is on 3000 so this should be on 3001
//when we run in console, it says running on port ...
//but when we look in brower port, it says cannot get