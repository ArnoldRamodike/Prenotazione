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
}