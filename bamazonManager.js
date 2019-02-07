const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "RikaNik79!",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    startMenu();
});

function startMenu() {
    console.log("\nWelcome to Bamazon Manager\n");
    inquirer
    .prompt({
        type: "list",
        name: "manager_tasks",
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ]
    }).then(function(answer) {

        switch(answer.manager_tasks) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                console.log("Please choose a valid entry");
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        }
    });
    connection.end();
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function(err, res) {
        if(err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        }
    });
    connection.end();
}

function addInventory() {
    inquirer    
        .prompt([
            {
                type: 'input',
                name: 'updateItem',
                message: 'Item ID: '
            },
            {
                type: 'input',
                name: 'updateAmt',
                message: 'How much would you like to add to the inventory?'
            }
        ]).then(function(answer) {
            const updateItem = answer.updateItem;
            const updateAmt = parseInt(answer.updateAmt);

            let amtQuery = 'SELECT * FROM products WHERE ?';

            // console.log(updateItem);
            connection.query(amtQuery, {item_id : updateItem}, function(err, res) {
                if(err) throw err;
                    
                const newStock = updateAmt + res[0].stock_quantity;
                    
            connection.query("UPDATE products SET ? WHERE ?", 
                    [
                        {
                            stock_quantity: newStock
                        },
                        {
                            item_id: updateItem
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " updated");
                        connection.end();
                    }
                    );
                }
            );
        });
}

function addProduct() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newProductName',
                message: 'What is the name of the product?'
            },
            {
                type: 'input',
                name: 'newDeptName',
                message: 'Which department is this in?'
            },
            {
                type: 'input',
                name: 'newPrice',
                message: 'What is the cost of this product?'
            },
            {
                type: 'input',
                name: 'newStock',
                message: 'How many units are in stock?'
            }
        ]).then(function(answer) {
            connection.query("INSERT INTO products SET?", 
            {
                product_name: answer.newProductName,
                department_name: answer.newDeptName,
                price: answer.newPrice,
                stock_quantity: answer.newStock
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " updated");
                connection.end();
            }
            );
        });
}

// function backToMenu() {
//     inquirer
//         .prompt({
//             type: 'list',
//             name: 'nextStep',
//             choices: [
//                 'Return to Menu',
//                 'Done'
//             ]
//         }).then(function(answer) {
//             if(answer.nexStep === 'Return to Menu') {
//                 startMenu();
//             } else {
//                 connection.end();
//             }
//         });
// }

