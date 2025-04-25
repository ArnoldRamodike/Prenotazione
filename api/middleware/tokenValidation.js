const { json } = require("express");
const { verify } =  require("jsonwebtoken");


module.exports= {
    checkToken: (req,res,next) => {
        const token = req.cookies.accessToken;
       
         if(token){
          
            verify(token, process.env.TOKEN_KEY, (err, decoded) =>{
                if(err){
                    res.json({
                        success:0,
                        message:"invalid token !"
                    })
                }else{
                    req.body.userInfo  = decoded.result;         
                    next(); 
                }
            })
         }else{
            res.json({
                success:0,
                message:"Status: Access denied! unauthorized user"
            })
         }
    },
    AdminToken: (req,res,next) => {
        const token = req.cookies.accessToken;
       
         if(token){
          
            verify(token, process.env.ADMIN_TOKEN_KEY, (err, decoded) =>{
                if(err){
                    res.json({
                        success:0,
                        message:"invalid token !"
                    })
                }else{
                    req.body.userInfo  = decoded.result;         
                    next(); 
                }
            })
         }else{
            res.json({
                success:0,
                message:"Status: Access denied! unauthorized user"
            })
         }
    },
}

export function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecrete, {}, async(err, user) => {
            if (err) throw err;
            resolve(user);
        });
    }); 
}