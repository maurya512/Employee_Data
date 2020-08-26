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

// the function that's gonna ask the user to make a selection
function employeeSearch() {
    inquirer
        .prompt({
            type: "rawlist",
            name: "employees",
            message: "What would you like to do?",
            choices: [
                "Look up all the employees in the company.",
                "Look up an employee's department.",
                "Look up an employee's role.",
                "Look up an employee's pay",
                "Add a new employee.",
                "EXIT"
            ]
        })
        .then(function(choice){
            switch(choice.employees){
                case "Look up all the employees in the company.":
                    // the function that displays all of the employees within a company 
                    employeeData();
                    break;
                
                case "Look up an employee's department.":
                    // the function that displays the department of employee within the company
                    empDepartment();
                    break;
                
                case "Look up an employee's role.":
                    // the function that displays the employee's role in the company
                    // something to do with the id
                    empRole();
                    break;

                case "Look up an employee's pay":
                    // the function that displays the employee's pay 
                    empPay();
                    break;

                case "Add a new employee.":
                    // the function that adds a new employee, department, role and pay
                    addNewEmployee();
                    break;

                case "EXIT":
                    // if the user chooses "exit" end the connection 
                    connection.end();

            }
        });
}

// 