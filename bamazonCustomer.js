var mysql = require("mysql");
var inq = require("inquirer");
var ctable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {
    listProducts();
}

function listProducts() {
    var query = connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("");
        console.table(data);
        console.log("");
        selectId();
    });
}

function selectId() {
    inq.prompt([
        {
            name: "Id",
            message: "What is the ID of the product you would like to purchase?",
            type: "input"
        },
        {
            name: "Quantity",
            message: "How many of this item would you like to purchase?",
            type: "input"
        }
    ]).then(function (data) {
 
        var pId = data.Id;
        var pQty = data.Quantity; 

        var query = "SELECT * FROM products WHERE item_id=" + pId;
        connection.query(query, function(err, data2){

            var num = data2.length
            if(num>0){

            var qtyLeft = data2[0].stock_quantity; 
                if(qtyLeft >= pQty){

                    var totalCost = data2[0].price * pQty; 
                        var newQty = qtyLeft - pQty;

                        var query2 = "UPDATE products SET stock_quantity =" + newQty + " WHERE item_id=" + pId;
                        connection.query(query2, function(err, data3){
                            if(err) throw err;
                            console.log("Order Complete!");
                            console.log("Total Price for "+ pQty +" of the " + data2[0].product_name + " is: $"+ totalCost);

                            listProducts();
                        });
                        
                }else{
                    console.log("\nInsufficient inventory!!\n");
                    listProducts();
                }

            }else{
                console.log("\nItem not found!!\n");
                listProducts();
            }
        });
        
    });
}
