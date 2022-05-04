const express = require('express')
const app = express()
const port = process.env.port || 5000;
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.get('/', (req,res)=>{
  res.send('Node.js is running');
})
//user = depositBook
//pass = Lef9ilzU8WbkWLFg

const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.BOOKS_USER}:${process.env.BOOKS_PASS}@cluster0.h0m8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
   await client.connect();
   const booksCollection = client.db('booksReader').collection('books');

   //get multiple data from db
   app.get('/inventory', async (req, res)=>{
     const query = {};
     const cursor = booksCollection.find(query);
     const books = await cursor.toArray();
     res.send(books);
   })
   //get single data from db
   app.get('/inventory/:id', async (req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const book = await booksCollection.findOne(query);
      res.send(book);
   })
  }
  finally{
    
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
  console.log('Crud server is running');
})