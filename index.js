const express = require('express')
const app = express()
const port = 5000
// const courses = require('./data/courses.json')
// const catagories = require('./data/catagory.json');
require('dotenv').config()
const cors = require('cors')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD



app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lgdlxzl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri)
async function run() {
    try {
        const coursesCollection = client.db('learnap').collection('courses')
        const catagoriesCollection = client.db('learnap').collection('catagories')
        app.get('/catagory', async (req, res) => {
            const qurey = {}
            const cursor = catagoriesCollection.find(qurey);
            const result = await cursor.toArray();
            res.send(result);

        })
        app.get('/allcourses', async (req, res) => {
            // res.send(courses)
            const qurey = {}
            const cursor = coursesCollection.find(qurey);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/courses/:id', async (req, res) => {
            const CatagoryId = req.params.id;
            let query = {};
            // console.log(CatagoryId);
            if (CatagoryId !== 'all') {
                // res.send(courses);
                query = { catagory: CatagoryId }

            }
            const cursor = coursesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
            // console.log(result)

            // const catagoryCourses = courses.filter(c => c.catagory === req.params.id);
            // res.send(catagoryCourses)

        })

    }
    finally {

    }

}
run().catch(err => console.log(err))


// app.get('/catagory', (req, res) => {
//     res.send(catagories);
// })
// app.get('/allcourses', (req, res) => {
//     res.send(courses)
// })

// app.get('/courses/:id', (req, res) => {
//     const CatagoryId = req.params.id;
//     console.log(CatagoryId);
//     if (CatagoryId === 'all') {
//         res.send(courses);
//     }
//     else {

//         const catagoryCourses = courses.filter(c => c.catagory === req.params.id);
//         res.send(catagoryCourses)
//     }
// })
app.get('/course/:id', (req, res) => {
    const CatagoryId = req.params.id;


    const catagoryCourse = courses.find(c => c.id === req.params.id);
    res.send(catagoryCourse)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})