DROP DATABASE bamazon;
Create database bamazon;
Use bamazon;

CREATE TABLE products(
		item_id  INT(11) auto_increment NOT NULL,
        product_name VARCHAR(200),
        department_name VARCHAR(200),
        price DECIMAL(6,2),
        stock_quantity INT(11),
		UNIQUE (item_id)
);

INSERT INTO products
				(product_name, department_name, price, stock_quantity)
VALUES  ("Bottle", "Home", 2, 50),
				("iPhone 7", "Electronics", 800, 10),
                ("Macbook Pro", "Electronics", 1000, 5),
                ("Airplane", "Transportation", 900, 1),
                ("Cap", "Clothing", 30, 100),
                ("Table", "Home", 60, 10),
                ("Paintings", "Decoration", 200, 10),
				("Banana", "Fruites", 1, 0);
                
SELECT * FROM products
            
            