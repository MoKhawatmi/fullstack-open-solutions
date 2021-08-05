let jwt=require("jsonwebtoken");
let User = require("../models/user");

function checkUserToken(req, res, next) {
    let token= req.cookies.userToken;
    if(token){
        jwt.verify(token,"serverSecret", (err,token)=>{
            if(err){
                res.locals.userToken=null;
                next();
            }else{
                res.locals.userToken=token;
                next();
            }
        })
    }else{
        res.locals.userToken=null;
        next();
    }
}

function extractUser(req, res, next) {
    let token= req.cookies.userToken;
    if(token){
        jwt.verify(token,"serverSecret", (err,token)=>{
            if(err){
                req.user=null;
                next();
            }else{
                User.findById(token.userId).then(user=>{
                    if(user){
                        req.user=user;
                    }else{
                        req.user=null;
                    }
                    next();
                });
                
                
            }
        })
    }else{
        res.locals.userToken=null;
        next();
    }
}

module.exports={checkUserToken, extractUser};