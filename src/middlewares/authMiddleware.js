const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/dbPool");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) return res.status(401).send("No token provided");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
