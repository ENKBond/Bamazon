# Bamazon

Bamazon is a CLI APP that uses node.js, MySQL, and the inquirer and mysql packages in NPM. Users of Bamazon can access either a point of sale system (Bamazon Customer) or an inventory control system (Bamazon Manager).

In order to use this app, please run the .sql file located in the repository.

## Bamazon Customer

The Bamazon Customer function is a real-time ordering system for users to purchase products. When the js file is first called, a list of all of the available products with an inventory stock quantity over zero (0) is displayed.

Users then order their product by entering in the corresponding item ID and the amount they would like to purchase. If there is enough in stock to fulfill the request, the user is notified of their total and the MySQL database is updated with the new stock quantity. 

![customer image one](https://github.com/ENKBond/Bamazon/blob/master/images/clip_1.JPG)

If there is not enough in stock to fulfill the request, the user is notifed and the database is not updated.

![customer image two](https://github.com/ENKBond/Bamazon/blob/master/images/clip_2.JPG)

## Bamazon Manager 

The Bamazon Manager function allows the user to perform 4 different tasks related to the inventory: view the inventory, view low inventory, add to the inventory of an item, and add a new item.

![manager image one](https://github.com/ENKBond/Bamazon/blob/master/images/clip_3.JPG)

### View Inventory
When the user chooses this option, all products are displayed along with their respective departments, prices, and stock quantities.

![manager image two](https://github.com/ENKBond/Bamazon/blob/master/images/clip_4.JPG)

### View Low Inventory
This option allows users to see all inventory that has a stock quantity of less than 10 units.

![manager image three](https://github.com/ENKBond/Bamazon/blob/master/images/clip_5.JPG)

### Add Inventory
This allows users to add to the stock quantity of a given product. The user chooses the product by ID and then enters in how much they wish to increase the stock by. When this is run, the database is updated with the increased stock quantity.

![manager image four](https://github.com/ENKBond/Bamazon/blob/master/images/clip_6.JPG)

### Add New Product
When this is chose, the user can add in a new product item. They are prompted to enter in the item name, the department it belongs in, the price of the product, and the amount in stock. When this is run, the database is updated with the new item.

![manager image five](https://github.com/ENKBond/Bamazon/blob/master/images/clip_7.JPG)

![manager image six](https://github.com/ENKBond/Bamazon/blob/master/images/clip_8.JPG)
*in the example above, row 11 was added and deleted during testing*
