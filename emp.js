var mysql = require("mysql");
var inquirer = require("inquirer");
const { config } = require("process");
const logo = require("asciiart-logo");
require("console.table");
display();

// a function that displays employee manager
function display() {
    const logoText = logo({name: "Employee Manager"}).render();
    console.log(logoText);
}

// create a connection with the database
var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,

    // username
    user: "root",

    // password
    password: "enph739ektA!",
    database: "employees"
});

// check if the connection has been made and if made run the function
connection.connect(function (err) {
    if (err) throw err;
    // if no connection has been made let us know
    // else run the function
    employeeSearch();
});

async function employeeSearch() {
    const {answer} = await prompt([
        {
            type: "list",
            name: "answer",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Look up all of the employees in the company?",
                    value: "View Employees",
                },
                {
                    name: "Look up all of the employees by department?",
                    value: "View Employee by Department"
                },
                {
                    name: "Look up all of the employees by roles?",
                    value: "View Employees by roles"
                },
                {
                    name: "Look up all of the managers in the company?",
                    value: "View Managers in the company"
                },
                {
                    name: "Add a new employee",
                    value: "Add Employee",
                },
                {
                    name: "Update Employee Info",
                    value: "Update Employee Info",
                },
                {
                    name: "Remove Employee from the database.",
                    value: "Remove Employee",
                },
                {
                    name: "Add a new role",
                    value: "Add Role",
                },
                {
                    name: "Update Role",
                    value: "Update Role",
                },
                {
                    name: "Remove role",
                    value: "Remove Role",
                },
                {
                    name: "Add a new Department",
                    value: "Add Department",
                },
                {
                    name: "Update Department",
                    value: "Update Department",
                },
                {
                    name: "Remove Department",
                    value: "Remove Department",
                },
            ],
        },
    ]);

    switch (answer) {
        case "View Employees":
            return viewEmployee(); 
        case "View Employee by Department":
            return viewDepartment();
        case "View Employees by roles ":
            return viewRoles();
        case "View Managers in the company":
            return viewManagers();
        case "Add Employee":
            return addEmployee();
        case "Update Employee Info":
            return updateEmployeeInfo();
        case "Remove Employee":
            return removeEmployee();
        case "Add Role":
            return addRole();
        case "Update Role":
            return updateRole();
        case "Remove Role":
            return removeRole();
        case "Add Department":
            return addDepartment();
        case "Update Department":
            return updateDepartment();
        case "Remove Department":
            return removeDepartment();
        default:
            return quit();
    }

    // a function to view all of the employees in the company's database
    function viewEmployee() {
        var query =`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
        LEFT JOIN role r
          ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
          ON m.id = e.manager_id`;
          connection.query(query, function(err,res){
            if (err) throw err;
            console.table(res);
            employeeSearch();
          })
    }

    // a function to view all of the employees in the company's databse by department. 
    function viewDepartment() {
        var query=`SELECT d.id, d.name AS Department, r.salary AS salary 
        FROM employee e
        LEFT JOIN role r
            ON e.role_id = r.id
          LEFT JOIN department d
          ON d.id = r.department_id
          LEFT JOIN employee m
            ON m.id = e.manager_id`;
            connection.query(query, function(err, res){
                if (err) throw err;
                console.table(res);
                employeeSearch();
            })
    }

    // a function to view all of the employees in the company's database by roles
    function viewRoles() {
    var query = `SELECT r.title AS ROLE, r.id, CONCAT (e.first_name, ' ', e.last_name) AS EMPLOYEE 
    FROM employee e
      LEFT JOIN role r
        ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      LEFT JOIN employee m
        ON m.id = e.manager_id`;
        connection.query(query, function (err,res){
            if (err) throw err;
            console.table(res);
            employeeSearch();
        })
    }

    // a function to view all of the managers in the company's database
    function viewManagers() {
        var query = `SELECT CONCAT (e.first_name, ' ', e.last_name) AS Manager, r.title, r.salary 
        FROM employee e 
        LEFT JOIN role r
            ON e.role_id = r.id
          LEFT JOIN department d
          ON d.id = r.department_id
          LEFT JOIN employee m
            ON m.id = e.manager_id
        WHERE e.manager_id IS NOT NULL`;
        connection.query(query, function(err, res){
            if (err) throw err;
            console.table(res);
            employeeSearch();
        })
    }

    // a function to add an employee to the company's database
    function addEmployee() {
        var query = `SELECT * FROM role`;
        connection.query(query, function (err ,res) {
            if (err) throw err;

            var titleArray = [];
            var roleIdArray = [];
            
            for (i = 0; i < res.length; i++){
                var titleEmp = res[i].title;
                titleArray.push(titleEmp);
            }

            for (j = 0; j < res.length; j++) {
                var empRole = res[i].id;
                roleIdArray.push(empRole);
            }

            var tempArr = [];
                objTitlerole
        })
    }
}