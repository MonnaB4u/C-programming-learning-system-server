const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.doolq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log(process.env.DB_user + process.env.DB_Password + process.env.DB_Name)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("C-courser");
        const AssignmentCollection = database.collection("Assignment");
        const VideosCollection = database.collection("Videos");
        const AnnounceCollection = database.collection("AnnounceCollection");

        // create a document to insert


        /// Add New User

        app.post('/addAssignment', async (req, res) => {
            const newData = req.body
            const result = await AssignmentCollection.insertOne(newData
            );
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })


        //////// Get All Project and Display

        app.get('/AssignmentCollection', async (req, res) => {
            const cursor = AssignmentCollection.find({});
            const user = await cursor.toArray();
            res.send(user.reverse());
        })

        app.get('/AssignmentDownload', async (req, res) => {
            const cursor = AssignmentCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })


        ///// Delete One Project
        app.delete('/AssignmentCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await AssignmentCollection.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        //////get Spacific user by ID

        app.get('/AssignmentCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await CruisesCollection.findOne(query);
            res.send(users)
        })

        ////////////////////////////////
        app.post('/addVideo', async (req, res) => {
            const newData = req.body
            const result = await VideosCollection.insertOne(newData
            );
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })

        app.get('/VideosCollection', async (req, res) => {
            const cursor = VideosCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })
        app.post('/addAnnouncemenr', async (req, res) => {
            const newData = req.body
            const result = await AnnounceCollection.insertOne(newData
            );
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })

        app.get('/AnnounceCollection', async (req, res) => {
            const cursor = AnnounceCollection.find({});
            const user = await cursor.toArray();
            res.send(user.reverse());
        })

    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Local Host", port)
})

