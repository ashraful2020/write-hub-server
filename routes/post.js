const route = require("express").Router();
const root_route = require("../index");

route.get("/posts", async (req, res) => {
  const cursor = root_route.client.postCollection.find({});
  const result = await cursor.toArray();
  return res.send(result);
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
