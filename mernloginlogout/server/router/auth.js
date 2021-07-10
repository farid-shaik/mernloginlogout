const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`);
});


// using Promises

// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword ) {
//         return res.status(422)._finaljson({ error: "please fill the field property"});
//     }

//     User.findOne({email : email});
//     .then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email already Exist"});
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(() => {
//             res.status(201).json({ message : "user registered successfully"});
//         }).catch((err) => res.status(500).json({error : "Failed to register"}));


//     }).catch(err => { console.log(err); });

// });





// using async

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({ error: "please fill the field property"});
    }

    try {

        const userExist = await User.findOne({email : email});

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist"});
        } else if(password != cpassword ) {
            return res.status(422).json({ error: "password is not maching"});
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            // yeha pe
            await user.save();

            res.status(201).json({ message : "user registered successfully"});
        }

        


        
    } catch (err) {
        console.log(err);
    }
 
});    




// login route


router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message : "awesome"})

    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(400).json({error : "please fill the data"})
        }

        const userLogin = await User.findOne({ email : email});

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password );

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });


            if (!isMatch) {
                res.status(400).json({ error : "user error"});
            } else {
                res.json({message : "user Signin Successfull"});
            }
        } else {
            res.status(400).json({ error : "user error"});
        }
        
        

    } catch (err) {
        console.log(err);
    }
});



// about us ka page


router.get('/about', authenticate,(req, res) => {
    console.log('Hello my about');
    res.send(req.rootUser);
});


// get user data for contact us and home page
router.get('/getdata', authenticate, (req,res) => {
    console.log('Hello my about');
    res.send(req.rootUser);
})


// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try {

        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "please fill the contact form"});
        }

        const userContact = await User.findOne({_id: req.userID});

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({message:"user contact successfully"})
        }



    } catch (error) {
        console.log(error);
    }
});


// Logout ka page
router.get('/logout', (req, res) => {
    console.log('Hello my logout page');
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send('user logout');
});


module.exports = router;