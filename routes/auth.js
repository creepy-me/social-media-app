const router = require("express").Router()
//const { getMaxListeners } = require("../models/user")
const User = require("../models/user")
const bcrypt = require("bcrypt")
//register
// router.get("/register",async(req,res)=>{
//     const user = await new User({
//         username:"sneha",
//         email:"snehu@gmail.com",
//         password:"123456"
//     });
//     await user.save();
//     res.send("ok");
// });
router.post("/register",async(req,res)=>{
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err)
    }
});

//login
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(404).json("wrong password");
        
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router
