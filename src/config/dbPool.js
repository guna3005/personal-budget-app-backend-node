const mysql = require("mysql");

// Database connection pool configuration
const pool = mysql.createPool({
  host: "sql5.freemysqlhosting.net",
  user: "sql5704114",
  password: "QHvMuchvDE",
  database: "sql5704114",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a pool connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) connection.release();
  return;
});


const JWT_SECRET = "GUNAPRANITHREDDYCHEELAM";

const closePool = () =>
  new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) return reject(err);
      resolve();
    });
  });

module.exports = { pool, JWT_SECRET, closePool };
