const express  = require('express'),
        router = express.Router(),
        {login , signUp} = require("../controllers/auth")


router.post("/login",login);
router.post("/signup",signUp);


module.exports = router