require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Connection to database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'));


app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
 m

app.listen(3000, () => {
    console.log("Server starter...")
})