const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const url = process.env.URL;

app.use(express.json());

const client = new MongoClient(url);
let db;


client.connect().then(() => db = client.db('Books_Store'));

app.listen(3000, (req, res) => {
    console.log('doWork');
})

app.get('/books', function (req, res) {
    let ans = [];
    db.collection('books').find().forEach(it => ans.push(it)).then(() => res.send(ans))
})

app.get('/books/:id', function (req, res) {

    if (ObjectId.isValid(req.params.id)) {
        console.log(req.params.id);
        db.collection('books').findOne({ _id: new ObjectId(req.params.id) })
            .then((doc) => { res.send(doc) })

    } else {
    }

})

app.post('/books', (req, res) => {
    console.log(req.body);
    db.collection('books').insertOne(req.body).then((doc) => res.send(doc))
})

app.delete('/books/:id', (req, res) => {
    db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) }).then((doc) => res.send(doc))
})