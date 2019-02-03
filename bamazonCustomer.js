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
    console.log("Bamazon: All the things you don't need\n Items currently on sale\n");
    connection.query("SELECT * FROM products",
    function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
        console.log("\nItem ID: " + res[i].item_id + " | " + " Product Name: " + res[i].product_name + " | " + " Price($: " + res[i].price);
        makePurchase();
        }       
    });
}

function makePurchase() {
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

            const itemID = parseInt(anwer.product_id);
            const amtBought = parseFloat(answer.purchase_amount);

            console.log("ID: " + itemID + " Amount: " + amtBought);
            console.log("Checking the inventory....");

            checkInventory(itemID, amtBought);
    });
}

function checkInventory(itemID, amtBought) {

    connection.query("SELECT * FROM products WHERE item_id =" + itemID, function(err, res) {
        if (err) throw err;

        const quantity = parseInt(res[0].stock_quantity);
        
        if(amtBought > quantity) {
            console.log("Sorry! We don't have enough in stock to fulfill your request. Please make another purchase");
            startShopping();
        } else {
            updateDb(itemID, amtBought, quantity);
        }
    });
}

function updateDb(itemID, amtBought, quantity) {

    connection.query("UPDATE products SET stock_quantity = " + (quantity - amtBought), function(err, res) {
        if (err) throw err;
    });

    connection.query("SELECT * FROM products WHERE item_id =" + itemID, function(err, res) {
        if (err) throw err;
        const price = parseFloat(res[0].price);
        const totalPrice = price * amtBought;
        
        console.log("Thank you for purchasing " + res[0].product_name + "\nYour total purchase amount is: $" + totalPrice);
    });

    connection.end();
}