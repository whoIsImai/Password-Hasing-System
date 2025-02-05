const express = require("express")
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const router = require('./routes/userRoute')

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error)=> console.error(error))
db.once("open", ()=> console.log("connected to database"))

app.use('',router)


app.listen(process.env.PORT || 1000, ()=> console.log(`server started on http://localhost:${process.env.PORT || 1000}`))