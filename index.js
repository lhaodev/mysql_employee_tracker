const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    start();
});


const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employees",
                "Add Departments",
                "Add Roles",
                "Update Employee Roles",
                "Exit"
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Employees":
                    addEmployee();
                    break;

                case "Add Departments":
                    addDepartment();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "Update Employee Roles":
                    updateRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};



const viewEmployees = () => {

    const query =
        'SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS employeeName, role.title, department.name as deparment, role.salary, CONCAT (manager.first_name, " ", manager.last_name) as manager from employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id';
    connection.query(query, (err, res) => {
        console.table(res)
        if (err) throw err;;
        start();
    });

};



const viewDepartments = () => {

    const query =
        'SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.table(res)
        if (err) throw err;;
        start();
    });

};


const viewRoles = () => {

    const query =
        'SELECT * FROM role';
    connection.query(query, (err, res) => {
        console.table(res)
        if (err) throw err;;
        start();
    });

};



const roleArray = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
};

// const employeeArray = [];
// function selectEmployee() {
//     connection.query("SELECT CONCAT(first_name, ' ', last_name) AS employeeName FROM employee", function (err, res) {
//         if (err) throw err
//         // res.forEach((({ first_name, last_name, id }) => {
//         //     employeeName.push({ name: `${first_name} ${last_name}`, value: `${id}` })
//         // }))

//         for (var i = 0; i < res.length; i++) {
//             employeeArray.push(res[i].employeeName);
//         }
//     })
//     return employeeArray;
// };




const addEmployee = () => {

    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "What's the employee's first name?",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "What's the employee's last name?",
            },
            {
                name: 'role',
                type: "list",
                message: "What's the employee's title? (role_id)",
                choices: selectRole()
            },

        ])
        .then((answer) => {
            const roleId = selectRole().indexOf(answer.role) + 1
            // console.log(answer.firstName);
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    // manager_id: answer.manager,
                },
                (err, res) => {
                    console.log(answer.firstName + " " + answer.lastName + " is added to the employee list.")
                    if (err) throw err;
                    console.table(answer)
                    start();
                }
            )
        }
        );
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: "What's the new department you want to add?",
                // validate(value) {
                //     if (isNaN(value) === false) {
                //         return true;
                //     }
                //     return false;
                // },
            }
        ])
        .then((answer) => {
            // console.log(answer.firstName);
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.name,
                },
                (err, res) => {
                    console.log(answer.name + " is added to the department list.")
                    if (err) throw err;
                    viewDepartments();
                    start();
                }
            )
        }
        );
};



const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: "What's the new role you want to add?",
            },
            {
                name: 'salary',
                type: 'input',
                message: "What's the salary for this role?",
            }
        ])
        .then((answer) => {
            // console.log(answer.firstName);
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.name,
                    salary: answer.salary
                },
                (err, res) => {
                    console.log(answer.name + " is added to the role list.")
                    if (err) throw err;
                    viewRoles();
                    start();
                }
            )
        }
        );
};





function updateRole() {
    connection.query("SELECT CONCAT(first_name,' ',last_name) AS employeeName FROM employee LEFT JOIN role ON employee.role_id = role.id", function (err, res) {
        if (err) throw err
        inquirer.prompt([
            {
                name: "name",
                type: "rawlist",
                message: "Who is the employee you would like to update?",
                choices: function () {
                    var employeeArray = [];
                    for (var i = 0; i < res.length; i++) {
                        employeeArray.push(res[i].employeeName);
                    }
                    return employeeArray;
                },
            },
            {
                name: "role",
                type: "rawlist",
                message: "what is their new role?",
                choices: selectRole()
            }
        ]).then(answer => {
            const roleId = selectRole().indexOf(answer.role) + 1
            connection.query("UPDATE employee SET ? WHERE ?",
                [
                    {
                        first_name: answer.name,
                    },
                    {
                        id: roleId,
                    },
                ],

                function (err) {
                    if (err) throw err
                    console.table(answer)
                    start();
                })
        });
    });
}


