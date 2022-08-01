const express = require("express");
const router = express.Router();
const root_route = require("../index");
const users = require("./users");
// User router
router.get("/user", async (req, res) => {
  // const result = await root_route.client.userCollection.find({}).toArray()
  const { name,email,id } = req.query;
  const keys = ["name", "email", "username"];
  const data = users.filter((user) =>
    keys.some((key) => user[key].toLowerCase().includes(name, email, "Kamren"))
  );
  console.log(data)
  console.log(req.query)
  return res.send(data);
});

module.exports = router;
