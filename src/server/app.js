const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const mongURI = "mongodb+srv://gerardomorales23s:srqV5VphAWgaZWNH@cluster0.5qp5c.mongodb.net/Mew-Food?retryWrites=true&w=majority&appName=Cluster0"


app.get('/',(req,res) =>{
    res.send("WELCOME TO NODEJS")
})

app.listen(3000,() =>{
    console.log("Listening on 300")
})