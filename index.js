const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 5000;
app.get('/', (req,res)=>{
    res.send('Hello world');
})
// user: booksUser
// pass: DcqNXLtWD6EZgwAs

const uri = `mongodb+srv://${process.env.BOOKS_USER}:${process.env.BOOKS_PASSWORD}@cluster0.h0m8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
      await client.connect()
      const booksCollection = client.db("booksReader").collection("books");
    }
    finally
    {
      // await client.close()
    }
}
run().catch(console.dir)
app.listen(port, ()=>{
    console.log("CRUD is running, keep hard working");
})