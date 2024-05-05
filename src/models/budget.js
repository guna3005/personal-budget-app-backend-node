const { pool } = require("../config/dbPool");

class Budget {
  static findByUserId(userId) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM budgets WHERE user_id = ?",
        [userId],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  }

  static create(userId, name, cost, month, color) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO budgets (user_id, name, cost, month, colour) VALUES (?, ?, ?, ?, ?)";
      pool.query(
        query,
        [userId, name, cost, month, color],
        (error, results) => {
          if (error) reject(error);
          resolve(results?.budgetId);
        }
      );
    });
  }
}

module.exports = Budget;
