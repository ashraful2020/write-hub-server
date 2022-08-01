const route = require("express").Router();
const root_route = require("../index");

 
route.post("/quote", async (req, res) => {
  console.log(req.body);
  const { email, message, type,author } = req.body;
  const post = {
    author,
    message,
    type,
    email,
  }
  const result = root_route.client.postCollection.insertOne(post);
  res.json({message:'Quote post successful',post});
});

module.exports = route;
