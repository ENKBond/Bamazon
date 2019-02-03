CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(8,2),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Real skull candy dish", "Home Decor", 20.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Inflatable Armchair", "Home Decor", 50.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dust Bunny throw blanket", "Home Decor", 5.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy S8 Locked", "Electronics", 120.50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple AirPods used", "Electronics", 80.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver parachute pants", "Clothing", 5.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Genuine cat hair jacket", "Clothing", 29.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Six piece LEGO set", "Toys", 10.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candy Coma Land board game", "Toys", 15.00, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("My First Amoeba doll", "Toys", 10.00, 3);