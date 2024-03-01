const express = require('express');
const app = express();
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.URI);

let dataBase = null;

async function run() {
    try {
        await client.connect();
        dataBase = client.db('test');
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect:', error);
    }
}



app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Server is running ');
    run();
})

app.get('/books', async function (req, res) {
    const coll = dataBase.collection('books');
    const cursor = coll.find();
    const result = [];

    for await (const it of cursor)
        result.push(it);

    res.send(result);
})

app.get('/books/:id', async function (req, res) {

    if (ObjectId.isValid(req.params.id)) {
        const coll = dataBase.collection('books');
        let result = await coll.findOne({ _id: new ObjectId(req.params.id) });

        if (result)
            res.send(result);
        else
            res.send({ Error: 'Not Found' });

    } else {
        res.status(401).send({ Error: "Invalid ID" });
    }

})

app.post('/books', async (req, res) => {
    const coll = dataBase.collection('books');
    const doc = req.body;
    const result = await coll.insertOne(doc);
    res.send(result.acknowledged);
})

app.delete('/books/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const coll = dataBase.collection('books');
        const result = await coll.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount)
            res.send(result);
        else
            res.send({ Error: 'Not Found' });
    } else {
        res.status(401).send({ Error: "Invalid ID" });
    }
})