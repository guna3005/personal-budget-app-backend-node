const { pool } = require("../config/dbPool");

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
        (error, results) => {
          if (error) return reject(error);
          resolve(results[0]);
        }
      );
    });
  }

  static create(username, hashedPassword) {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO user (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (error, results) => {
          if (error) return reject(error);
          resolve(results.insertId);
        }
      );
    });
  }
}

module.exports = User;
