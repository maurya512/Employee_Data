// switch case with inquirer
// inquirer prompt. if they choose this option run this case and so on and so forth

// modules 
var mysql = require("mysql");
var inquirer = require("inquirer");
const { config } = require("process");
require("console.table");

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

// the function that's gonna ask the user to make a selection
function employeeSearch() {
    inquirer
        .prompt({
            type: "list",
            name: "company",
            message: "What would you like to do?",
            choices: [
                "Look up all the employees in the company.",
                "Look up employees' department.",
                "Look up employees' role.",
                "Look up employees' pay",
                "Look up managers in the company",
                "Add a new employee.",
                "Add a new Department",
                "Add a new role",
                // "Remove Employee",
                "Update Employee Info",
                "Show updated database",
                "EXIT"
            ]
        })
        .then(function (answer) {
            switch (answer.company) {
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

                case "Look up managers in the company":
                    // the function that displays which employees are managers
                    isManager();
                    break;

                case "Add a new employee.":
                    // the function that adds a new employee, department, role and pay
                    addNewEmployee();
                    break;

                case "Add a new Department":
                    // the function that lets the user add a new Department
                    addNewDepartment();
                    break;

                case "Add a new role":
                    // the function that lets the user add a new role
                    addNewRole();
                    break;

                // case "Remove Employee":
                //     // the function that lets the user remove Employee
                //     rmEmployee();
                //     break;

                case "Update Employee Info":
                    // the function that lets the user update Employee Info
                    updateDatabase();
                    break;

                case "Show updated database":
                    // the function that lets the user display update database
                    updatedDB();
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
    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log("Error trying to get all employees");
        console.table(res);
        console.log("All employees were viewed.");
        employeeSearch();
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
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("All Departments were viewed.");
        employeeSearch();
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
    connection.query(query, function (err, res) {
        if (err) {
            console.log("Error trying to get employee's roles");
        }
        console.table(res);
        console.log("All Roles were viewed");
        employeeSearch();
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
    connection.query(query, function (err, res) {
        if (err) {
            console.log("Error trying to get employee's pay");
        }
        console.table(res);
        console.log("All Employees' salary was viewed.");
        employeeSearch();
    });
}

// a function to see if the employee is a manager in the company

function isManager() {
    var query = `SELECT CONCAT (e.first_name, ' ', e.last_name) AS Manager, r.title, r.salary 
    FROM employee e 
    LEFT JOIN role r
        ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      LEFT JOIN employee m
        ON m.id = e.manager_id
    WHERE e.manager_id IS NOT NULL`;
    connection.query(query, function (err, res) {
        if (err) {
            console.log("There was error trying to see which employee is a manager.");
        }
        console.table(res);
        console.log("All managers were viewed.");
        employeeSearch();
    });
}

// a function to add new employee
function addNewEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the employee's role id?"
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the employee's manager id?"
            }
        ]).then(function (res) {
            connection.query("INSERT INTO employee SET ?", {
                first_name: res.first_name,
                last_name: res.last_name,
                role_id: res.role_id,
                manager_id: res.manager_id
            },
                function (err) {
                    if (err) throw err;
                    console.log("Employee successfully added.");
                    updateEmployeeData();
                    employeeSearch();
                });
        });
}

// a function to add Department
function addNewDepartment() {
    inquirer
        .prompt(
            [{
                type: "input",
                name: "department_name",
                message: "What department would you like to add?"
            }
            ]).then(function (answer) {
                connection.query("INSERT INTO department SET ?",
                    {
                        name: answer.department_name,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Department successfully added.");
                        updateDepartment();
                        employeeSearch();
                    });
            });
}

// a function to add a new role
function addNewRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Describe the new role."
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the department id?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (res) {
            connection.query("INSERT INTO role SET ?", {
                title: res.title,
                department_id: res.department_id,
                salary: res.salary
            },
                function (err) {
                    if (err) throw err;
                    console.log("Role was added.");
                    updateRole();
                    employeeSearch();
                });
        });
}

// a function to display the updated employee table
function updateEmployeeData() {
    var query = `SELECT * FROM employee`;
    connection.query(query, function (err, res) {
        if (err) {
            console.log("Employee table couldn't be update.");
        }
        console.table(res);
        console.log("Successfully viewed the updated employee table.");
        employeeSearch();
    });
}

// a function to display the updated department table
function updateDepartment() {
    var query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) {
            console.log("Department table couldn't be updated.");
        }
        console.table(res);
        console.log("Successfully viewed the updated department table.");
        employeeSearch();
    });
}

// a function to display the updated the role table
function updateRole() {
    var query = `SELECT * FROM role`;
    connection.query(query, function (err, res) {
        if (err) {
            console.log("Role table couldn't be updated.");
        }
        console.table(res);
        console.log("Successfully viewed the updated role table");
        employeeSearch();
    });
}

function updatedDB() {
    var query = `select * from employee`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        employeeSearch();
    });
}

function updateDatabase() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "empUpdate",
                message: "Which employee would you like to update?"
            },
            {
                type: "input",
                name: "updateRole",
                message: "What role do you want to update to?"
            }
        ]).then(function (answer) {
            connection.query('UPDATE employee SET role id=? WHERE first_name = ?', [answer.updateRole], [answer.empUpdate], function (err) {
                if (err) throw err;
                console.log("Successfully updated the database.");
                employeeSearch();
            });
        })
}
// a function to delete employee from the datbase
// function rmEmployee() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "firstName",
//             meesage: "What is the first name of the employee you want to delete?"
//         },
//         {
//             type: "input",
//             name: "lastName",
//             message: "What is the last name of the employee you want to delete?"
//         }
//     ]).then(function(res){
//         var query = `DELETE FROM employee WHERE first_name = ${res.firstName} AND last_name = ${res.lastName}`;
//         connection.query(query, function(err){
//             if (err) throw err;
//             console.log("Employee Successfully removed.");
//         });
//     });
// }