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

app.get('/hello', (req,res)=>{
  res.send('hello world')
})

//user = depositBook
//pass = Lef9ilzU8WbkWLFg

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.BOOKS_USER}:${process.env.BOOKS_PASS}@cluster0.h0m8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
   await client.connect();
   const booksCollection = client.db('booksReader').collection('books');
   app.get('/inventory', async (req, res)=>{
     const query = {};
     const cursor = booksCollection.find(query);
     const books = await cursor.toArray();
     res.send(books);
   })
  }
  finally{
    
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
  console.log('Crud server is running');
})