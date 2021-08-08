let express=require("express");
let router=express.Router();
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
let User=require("../models/user");

const maxAge=3*24*60*60;
function createToken(userId){
    return jwt.sign({userId},"serverSecret",{expiresIn:maxAge});
}


router.get("/",(req,res)=>{
    User.find().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).send(err);
    })
})

router.post("/",(req,res)=>{
    let newUser=req.body;
    if(newUser.userName && newUser.password && newUser.password.length>=3){
        bcrypt.genSalt().then(salt=>{
            bcrypt.hash(newUser.password,salt).then(passHash=>{
                newUser.password=passHash;
                let user=new User(newUser);
                user.save().then(result=>{
                    res.status(201).json(result);
                }).catch(err=>{
                    res.status(400).send(err);
                });
            })
        })
    }else{
        res.status(400).send("User name and password must be given, password must be longer than 3 chars");
    }
})

router.post("/login",(req,res)=>{
    let userName=req.body.userName;
    let password=req.body.password;

    User.findOne({userName}).then(user=>{
        if(user){
            bcrypt.compare(password, user.password).then(auth=>{
                if(auth){
                    let token=createToken(user._id);
                    res.cookie("userToken",token,{httpOnly:true,maxAge});
                    res.status(200).json(user);
                }else{
                    res.status(400).send("Wrong username or password");
                }
            });
        }else{
            res.status(400).send("Wrong username or password");
        }
    });
})

router.get("/logout",(req,res)=>{
    res.cookie("userToken","",{maxAge:1});
    res.end();
})

module.exports=router;