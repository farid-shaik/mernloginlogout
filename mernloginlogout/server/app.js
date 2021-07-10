const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();



const cookieParser = require("cookie-parser");
app.use(cookieParser ());



dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema')


app.use(express.json());

// we link the router files to make our route esay
app.use(require('./router/auth'));


const PORT = process.env.PORT;





// app.get('/About', middleware, (req, res) => {
//     console.log('Hello my About');
//     res.send('hii farid this is about page')
// })

// app.get('/Contact', (req, res) => {
//     // res.cookie("Test", 'thapa');
//     res.send('hii farid this is Contact page')
// });

// app.get('/Signin', (req, res) => {
//     res.send('hii farid this is Signin page')
// })

app.get('/Signup', (req, res) => {
    res.send('hii farid this is Signup page')
})

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
})
