const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME ,
    authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.MYSQL_PASSWORD + '\0'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}
});

if(connection){
  console.log("Connected to MySQL")
}else{
  console.log("Error connecting to mysql")
}


module.exports = connection;








/*table creation function
const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  category_name VARCHAR(255),
  product_name VARCHAR(255),
  brand VARCHAR(255),
  MRP INT,
  discounted_price INT,
  stock INT
)
`;

// Execute the query to create the table
connection.query(createTableQuery, (error, results, fields) => {
if (error) {
  console.error('Error creating table:', error);
} else {
  console.log('Table created successfully');
}
})
*/

  /*Products
    products.forEach((product) => {
    const insertProductQuery = `
      INSERT INTO products (category_id, category_name, product_name, brand, MRP, discounted_price, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      insertProductQuery,
      [
        product.category_id,
        product.category_name,
        product.product_name,
        product.brand,
        product.MRP,
        product.discounted_price,
        product.stock,
      ],
      (error, results, fields) => {
        if (error) {
          console.error('Error inserting product:', error);
        } else {
          console.log(`Product inserted successfully: ${product.product_name}`);
        }
      }
    );
  });
  */