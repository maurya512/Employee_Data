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
                "Look up employees' department.",
                "Look up employees' role.",
                "Look up employees' pay",
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
                
                case "Look up employees' department.":
                    // the function that displays the department of employee within the company
                    empDepartment();
                    break;
                
                case "Look up employees' role.":
                    // the function that displays the employee's role in the company
                    // something to do with the id
                    empRole();
                    break;

                case "Look up employees' pay":
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

// the function that queries all of the employee in the company's database
function employeeData() {
    // create a new table by combining all the columns from multiple tables using join
    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name)` ;
    query += `AS manager FROM employee e`;
    query += `
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`;
    connection.query(query,function(err,res){
        if (err) {
            console.log("Error trying to get all employees");
        }
        console.table(res);
        console.log("All employees were viewed.");
    });
}

// function that queries the deparment of each the employee the user wants to search
function empDepartment() {
    var query = `SELECT d.id, d.name AS Department, r.salary AS salary 
    FROM employee e
    LEFT JOIN role r
        ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      LEFT JOIN employee m
        ON m.id = e.manager_id`;
    connection.query(query, function(err,res){
        if (err) {
            console.log("Error trying to access the departments.");
        }
        console.table(res);
        console.log("All Departments were viewed.");
    });
}

// funcation that queries the roles of each of the employee to the user
function empRole() {
    var query = `SELECT r.title AS ROLE, r.id, CONCAT (e.first_name, ' ', e.last_name) AS EMPLOYEE 
    FROM employee e
      LEFT JOIN role r
        ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      LEFT JOIN employee m
        ON m.id = e.manager_id`;
    connection.query(query, function(err, res){
        if(err) {
            console.log("Error trying to get employee's roles");
        }
        console.table(res);
        console.log("All Roles were viewed");
    });
}

// A function to get each employee's pay 
function empPay() {
    var query = `SELECT CONCAT(e.first_name, ' ', e.last_name) AS EMPLOYEE, r.salary AS SALARY
    FROM employee e
      LEFT JOIN role r
        ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      LEFT JOIN employee m
        ON m.id = e.manager_id`;
    connection.query(query, function(err, res){
        if(err) {
            console.log("Error trying to get employee's pay");
        }
        console.table(res);
        console.log("All Employees' salary was viewed.");
    });
}

// 
