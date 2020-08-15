const User = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const Permission = require("../models/permissions")


exports.signUp = async(req,res,next)=>{

    let email = req.body.email
    let password  = req.body.password
    let username = req.body.username
    let admin = req.body.admin;

    try{
        let user =  await User.findOne({where:{email : email}})

        if(user){
            let err  = new Error("Email already exist")
            err.status = 400
            throw(err)
        }
        
        let hashPass = await bcrypt.hash(password,12)

        let newUser = {
                email:email,
                username:username,
                password:hashPass,
                admin:admin
        }

        let newuser = await User.create(newUser);

        if( !admin ){

            let permission  = {
                
                userId : newuser.id,
                accessGreen : true,
                accessRed : false
    
            }

            let addedPermission = await Permission.create(permission);
        }
       
    

        let token = jwt.sign({
            email:newuser.email,
            userId:newuser.id

            }, process.env.jwtSecret,{
                expiresIn:"1h"
        })

        res.status(201).json({
            message:'new user created',
            token:token,
            username:username,
            admin:admin,
        })
    }
    
    catch(err){
        next(err)
    }

}


exports.login = async(req,res,next)=>{

    let email = req.body.email
    let password  = req.body.password

    try{

        let foundUser = await User.findOne({ where: {email : email}});

        if(!foundUser){
            let err  = new Error("No user found with this email")
            err.status = 404
            throw(err)
        }

        let isEqual = await bcrypt.compare(password , foundUser.password)

        if( !isEqual ){
            let err = new Error("Invalid email or password")
            err.status = 401
            throw(err)
        }


        const token = jwt.sign({
            email:foundUser.email,
            userId:foundUser.id
        }, process.env.jwtSecret, {expiresIn:'1h'})

        res.status(200).json({
            token:token,
            message:"Successfully logged in",
            username:foundUser.username,
            admin:foundUser.admin,
        })
    }
    catch(err){
        next(err)
    }
}