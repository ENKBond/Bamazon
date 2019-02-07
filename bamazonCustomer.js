const mysql = require("mysql");
const inquirer = require("inquirer");

let id;
let units;
let totalPrice;
let unitPrice;
let currentSales;
let newSales;

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
    console.log("\nBamazon: All the Things You Don't Need\n");
    console.log("\nItems currently for sale\n");
    connection.query("SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price $" + res[i].price);
        }
        makePurchase();
    });
}

function makePurchase() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID of the product you would like to purchase:'
        },
        {
            type: 'input',
            name: 'units',
            message: 'How many would you like to purchase?'
        }
    ]).then(function(answer) {
        id = parseInt(answer.id);
        units = parseInt(answer.units);

        checkStock(id, units);
    })
}

function checkStock(id, units) {
    let checkQuery = 'SELECT * FROM products WHERE ?';
    connection.query(checkQuery, {item_id : id}, function(err,res) {
        if (err) throw err;
        // console.log(res);
        let amtInStock = parseInt(res[0].stock_quantity);
        if (units > amtInStock) {
            console.log("Sorry! We don't have enough in stock to fulfill your order");
            connection.end();
        } else {
            updateDB(id, units, amtInStock);
        }
    });
}

function updateDB(id, units, amtInStock) {
    let unitQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    let priceQuery = "SELECT price FROM products WHERE ?";
    let stockAmt = amtInStock - units;

    connection.query(unitQuery, [stockAmt, id], function(err,res) {
        if (err) throw err;
    })
    connection.query(priceQuery, {item_id : id}, function(err,res) {
        if (err) throw err;
        unitPrice = parseFloat(res[0].price);
        totalPrice = unitPrice * units;
        console.log("Thank you for your purchase. Your total today is: $" + totalPrice);
    })
    connection.end();
}

