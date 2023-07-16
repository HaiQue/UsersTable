const express = require("express");
const cors = require("cors"); // Import cors
require("dotenv").config();
const app = express();

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 5000;

// Database connection
require("./config/database/db.js");

// Middleware
const { queryHandler } = require("./middlewares/query.js");
app.use(express.json());

// Controllers
const {
  getAllUsers,
  getSingleUser,
  addSingleUser,
  updateSingleUser,
  deleteSingleUser,
  searchUsers,
} = require("./controllers/users.controller.js");

// Define routes for http server
// GET
// -- get all users  |   localhost:5000/api/users
app.get("/api/users", queryHandler, getAllUsers);

// SEARCH
// -- search for users | localhost:5000/api/users/search?name=searchTerm
app.get("/api/users/search", searchUsers);

// -- get single user based on id
app.get("/api/users/:id", getSingleUser);

// POST
// -- add single user  |   localhost:5000/api/users
app.post("/api/users", addSingleUser);

// PUT
// -- update single user based on id   |   localhost:5000/api/users/:id
app.put("/api/users/:id", updateSingleUser);

// DELETE
// -- delete single user based on id   |   localhost:5000/api/users/:id
app.delete("/api/users/:id", deleteSingleUser);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
