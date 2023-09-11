const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/users');


passport.use(new LocalStrategy({
    usernameField: 'email', //here we are defining usernamefiled as email, bcoz thats unique
    passReqToCallback: true //this gives us an access to add request as parameter
    },
    async function(req,email,password,done){ //here we are taking 3 arguments, the done is a callback functions which reports to passport.js
        //find a user and establish the identity
        try{
            let user= await User.findOne({email:email})
            if(!user || user.password != password){
                console.log("invalid username/password");
                return done(null, false)//done has 2 arguments 1st is error and second is authenication is done or not
            }
            return done(null, user)
        }
        catch(err){
            console.log('Error in finding user passport');
            return done(err)
        }
    }
));


passport.serializeUser(function(user,done){
    done(null,user.id)
})


passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(function(user){
        return done(null,user)
    })
    .catch(function(err){
        console.log('Error in finding user in cookies');
        return done(err)
    })
})

passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the result to next function
    if(req.isAuthenticated()){ //most of the time req.isAuthenticated is simply checking whether or not the value req.user is set, but the details can change depending upon your Passport configuration. isAuthenticated method is added to the req object by Passport.js.
        return next()
    }
    res.redirect('/users/signin')
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){ //So effectively isAuthenticated should return true if req.user has been set to a non-null object and false if req.user is null or false or 0, etc.
        //req.user contains current signin user from the cookies and we are sending this to locals for the views
        res.locals.user = req.user;//this locals helps us to fetch the data in views
    }
    next()
}

module.exports.passport