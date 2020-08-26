// switch case with inquirer
// inquirer prompt. if they choose this option run this case and so on and so forth

// modules 
var mysql = require("mysql");
var inquirer = require("inquirer");

// create a connection with the database
var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 8080,

    // username
    user: "root",

    // password
    password: process.env.MYSQL_KEY,
    database: "employees"
});

// check if the connection has been made and if made run the function
connection.connect(function(err){
    if(err){
        // if no connection has been made let us know
        console.log(err);
    }
    // else run the function
    employeeSearch();
});

