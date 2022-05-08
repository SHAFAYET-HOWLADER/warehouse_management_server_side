const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Node.js is running');
})
//user = depositBook
//pass = Lef9ilzU8WbkWLFg
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.BOOKS_USER}:${process.env.BOOKS_PASS}@cluster0.h0m8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const booksCollection = client.db('booksReader').collection('books');
    const myBooksCollection = client.db('booksReader').collection('myBooks');
    //------------------add books start--------------------->
    app.put('/book/:id', async (req, res) => {
      const id = req.params.id;
      const quantity = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: quantity.newQuantity
        },
      };
      const result = await booksCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
    //------------------add books end--------------------->

    //------------------add myBooks start--------------------->
    app.put('/myBooks/:id', async (req, res) => {
      const id = req.params.id;
      const quantity = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: quantity.newQuantity
        },
      };
      const result = await myBooksCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
    //------------------add myBooks end--------------------->

    //---------------reduce quantity start-------------->
    app.put('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const deliver = user.quantity - 1;
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: deliver
        }
      }
      const result = await booksCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })
    //---------------reduce quantity end-------------->

    //---------------reduce myBooks quantity start-------------->
    app.put('/my/:id', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const deliver = user.quantity - 1;
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: deliver
        }
      }
      const result = await myBooksCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })
    //---------------reduce myBooks quantity end-------------->


    //-------------get multiple data from db start------------->
    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = booksCollection.find(query);
      const books = await cursor.toArray();
      res.send(books);
    })
    app.get('/myBooks', async (req, res) => {
      const query = {};
      const cursor = myBooksCollection.find(query);
      const books = await cursor.toArray();
      res.send(books);
    })
    //-------------get multiple data from db end------------->

    //----------------get single data from db start-------------->
    app.get('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const book = await booksCollection.findOne(query);
      res.send(book);
    })
    app.get('/myBooks/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const book = await myBooksCollection.findOne(query);
      res.send(book);
    })
    //----------------get single data from db end-------------->

    //-------------------post data start-------------------->
    app.post('/myBooks', async (req, res) => {
      const book = req.body;
      const result = await myBooksCollection.insertOne(book);
      res.send(result);
    })
    //-------------------post data end-------------------->

    //<--------------delete book start------------------->
    app.delete('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await booksCollection.deleteOne(query);
      res.send(result);
    })
    app.delete('/myBooks/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await myBooksCollection.deleteOne(query);
      res.send(result);
    })
    //<--------------delete book end------------------->

  }
  finally {

  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log('Crud server is running', port);
})
