const route = require("express").Router();
const root_route = require("../index");
const { ObjectId } = require("mongodb");
route.get("/posts", async (req, res) => {
  const cursor = root_route.client.postCollection.find({}).skip(0).limit(11);
  const result = await cursor.toArray();
  return res.send(result);
});
route.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const cursor = await root_route.client.postCollection.findOne(query);
  return res.send(cursor);
});

route.get("/category-post", async (req, res) => {
  const query = req?.query?.category;
  console.log(req.query, "a");
  const cursor = root_route.client.postCollection
    .find({ category: query })
    .skip(0)
    .limit(11);
  const result = await cursor.toArray();
  // console.log(result);
  res.send({ success: true, result });
});
route.post("/posts", async (req, res) => {
  const {
    title,
    message,
    summery,
    category,
    author,
    type,
    authorEmail,
    authorPhoto,
  } = req.body;
  const pic = req.files?.image?.data;
  if (req.files?.image?.size > 20000) {
    return res.send({ message: "Please add less then 20KB image" });
  }
  const encodedPic = pic.toString("base64");
  const imageBuffer = Buffer.from(encodedPic, "base64");
  const post = {
    title,
    message,
    summery,
    category,
    author,
    authorEmail,
    authorPhoto,
    type,
    bannerImage: imageBuffer,
    date: new Date().toDateString(),
  };
  const result = root_route.client.postCollection.insertOne(post);

  return res.send({ message: "Congratulation's blog post successful", result });
});

module.exports = route;
