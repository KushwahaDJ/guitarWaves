const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//========================================================
//             Models
//========================================================

const { User } = require('./models/user');



//=====================================================
//           users 
//=====================================================


app.post('/api/users/register', (req, res)=>{
        // res.status(200);
        const user = new User(req.body);

        user.save((err, doc)=>{
            if(err) return res.json({success:false, err});
            res.status(200).json({
                success: true,
                userdata: doc
            })
        })
})

app.post('/api/users/login', (req, res)=>{
    
    //finde the user email

    User.findOne({'email':req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess: false, message:'Auth fails, email not found'});    
    })

    // check password

    // generate token
})









const port = process.env.PORT || 3002;

app.listen(port, ()=> {
    console.log(`Server Running at ${port}`)
})