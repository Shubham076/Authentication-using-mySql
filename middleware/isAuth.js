const jwt = require("jsonwebtoken")


module.exports = async(req,res,next)=>{
    // Authorization header
    let token;
    if(req.get('Authorization') && req.get('Authorization').startsWith("Bearer ")){

    token = req.get('Authorization').split("Bearer ")[1];
    



    }

    else{
        let err = new Error("not Authenticated")
        err.status = 401,
        next(err)
    }

    try{

        let decodedToken =  await jwt.verify(token , process.env.jwtSecret)

        if(!decodedToken){
            let err = new Error("Not a valid token")
            err.status = 401
            throw(err)
        }



        req.id = decodedToken.userId
        next()

    }
    catch(err){
        next(err)
    }


}