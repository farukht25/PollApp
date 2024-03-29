const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()

const port = process.env.port || 5000;
app.use(cors());
app.use(express.json())

const uri = process.env.ATLAS_URI;


mongoose.connect(uri, { useNewUrlParser: true})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("mongo DB Connection established successfully")
})

 const pollRouter=require('../backend/routes/poll')


 app.use('/poll',pollRouter);


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})