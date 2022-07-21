const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
// Apps middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.wijwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    client.connect();
    app.get("/", async (req, res) => {
      res.send(
        `<h1 style='color:#99bbf2;font-size:70px; margin-top:20%; text-align:center'> Write-hub server side</h1>`
      );
    });
  } finally {
    /** await client.close(); **/
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`server is running on port port`);
});
module.exports.client = {
  /** here no need to use client and database object**/
  // client: client,
  //database: client.db('database_name'),;
  FirstCollection: client.db("write-hub").collection("user "),
  SecondCollection: client.db("write-hub").collection("post"), 
};
