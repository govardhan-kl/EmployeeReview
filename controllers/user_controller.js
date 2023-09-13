const User = require('../models/users');
const PerformanceData = require('../models/perormanceData');

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home/all')
    }
    res.render('user-signin',{
        title:"Sign-In"
    })
}


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home/all')
    }
    res.render('user-signup',{
        title:"SignUp"
    })
}


module.exports.create = async function(req,res){
    try{
        if(req.body.password != req.body.confirm_password){
            res.redirect('back')
        }
        let user = await User.findOne({email: req.body.email})
        if (user){
            console.log('user exists')
            res.redirect('back')
        }
        if (req.body.email=="admin@admin.com"){
            await User.create({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
                isAdmin:true,
            })
        }else{
            await User.create({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
                isAdmin:false,
            })
        }
        res.redirect('/users/signin')
    }catch(err){
        console.log(`Eror in creating user : ${err}`);
    }
    
}


module.exports.login = async function(req,res){
    res.redirect('/home/all')
}


module.exports.destroySession = function(req,res){
    req.logout(function(err) { //logout function is given to req by passport
        if (err) { return next(err); }
        res.redirect('/users/signin');
      });
}


module.exports.add_review = async function(req,res){
    let userReviews = await PerformanceData.find({ReviewTo:req.params.id,isReviewed:true}).sort('-createdAt').populate('ReviewTo').populate('ReviewBy');
    let username = await User.findById(req.params.id);
    res.render('home_addreview',{
        title:"addreview/update",
        userReviews,
        username
    })
}