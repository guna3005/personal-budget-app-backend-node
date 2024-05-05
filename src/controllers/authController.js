const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET, pool } = require("../config/dbPool");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).send("Username already exists"); // HTTP 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(username, hashedPassword);
    res.status(201).send("User successfully registered");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error registering user");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid username or password");
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "60s" });

    const insertTokenQuery =
      "INSERT INTO tokens (user_id, token) VALUES (?, ?)";
    await pool.query(insertTokenQuery, [user.id, token]);

    res.json({ token });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).send("Error logging in");
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: "60s",
    });

    // Update the token in the database
    const updateTokenQuery = "UPDATE tokens SET token = ? WHERE token = ?";
    await pool.query(updateTokenQuery, [newToken, token]);

    res.json({ token: newToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(401).send("Invalid or expired token");
  }
};
