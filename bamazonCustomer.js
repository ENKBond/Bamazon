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
    startShopping();
});

function startShopping() {
    console.log("Items currently on sale\n");
    connection.query("SELECT item_id, product_name, price FROM Products",
    function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
        console.log("\nItem ID: " + res[i].item_id + " Product Name: " + res[i].product_name + " Price($: " + res[i].price);
        }
        return true;
    });
    inquirer    
        .prompt([
        {    
            type: 'input',
            name: 'product_id',
            message: 'Please enter the item ID of the product you would like to buy: ',
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'purchase_amount',
            message: 'Please enter the quantity you would like to buy: ',
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
        ])
        .then(function(answer) {
            
        })
}

// function makeAPurchase() {

// }