const User = require("../models/user.model.js");

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User with given id not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addSingleUser = async (req, res) => {
  const data = req.body;

  try {
    const user = new User(data);
    const userSaved = await user.save();

    if (userSaved) {
      res.status(201).json({ message: "User saved", data: userSaved });
    } else {
      res.status(404).json({ message: "User not saved" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSingleUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const userToBeUpdated = await User.findById(id);
    if (!userToBeUpdated) {
      res.status(404).json({ message: "User with given id not found" });
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, data);

      if (updatedUser) {
        res.status(201).json({ message: "User updated" });
      } else {
        res.status(404).json({ message: "User not updated" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not deleted. Invalid user id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchUsers = async (req, res) => {
  const { name, surname, email, age } = req.query;

  try {
    let queryObject = {};
    if (name) queryObject.name = name;
    if (surname) queryObject.surname = surname;
    if (email) queryObject.email = email;
    if (age) queryObject.age = Number(age);

    const users = await User.find(queryObject);

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addSingleUser,
  updateSingleUser,
  deleteSingleUser,
  searchUsers,
};
