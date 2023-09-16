const User = require('../models/users');
const PerformanceData = require('../models/perormanceData');

// this for admin and employee to display all the respective details
module.exports.all = async function(req,res){
    console.log(req.user)
    let users = await User.find({})
    if(!req.user.isAdmin){
        let Myreviews = await PerformanceData.find({ReviewTo:req.user.id,isReviewed:true}).sort('-createdAt').populate('ReviewTo').populate('ReviewBy');
        let pendeningReviews = await PerformanceData.find({ReviewBy:req.user.id,isReviewed:false}).sort('-createdAt').populate('ReviewTo').populate('ReviewBy');
        // console.log("MyReviews",Myreviews);
        // console.log("pendeningReviews",pendeningReviews);
        // console.log("locals",res.locals);
        return res.render('home',{
            title:'Home',
            users,
            Myreviews,
            pendeningReviews
        })
    }
    return res.render('home',{
        title:'Home',
        users
    })
}

//thi is for admin to make employess give review 
module.exports.assign_work = async function(req,res){
    let users = await User.find({})
    res.render('home_assignwork',{
        title:"Assign-Work",
        users
    })
}

//This is for admin to make employess give review
module.exports.create = async function(req,res){
    try{
        console.log(req.body)
        if(req.body.content){
            await PerformanceData.create({
                ReviewTo:req.body.ReviewTo,
                content:req.body.content,
                ReviewBy:req.body.ReviewBy,
                isReviewed:true
            })

            return res.redirect('back')
        }
        await PerformanceData.create({
            ReviewTo:req.body.ReviewTo,
            ReviewBy:req.body.ReviewBy,
            isReviewed:false
        })
        res.redirect('back');
    }catch(err){
        console.log('Error in assigning work',err);
    }
}

//This is for giving review by the employees
module.exports.update = async function(req,res){
    console.log(req.params.id,req.body);
    let performance = await PerformanceData.findById(req.params.id)
    performance.content = req.body.content;
    performance.isReviewed = true;
    performance.save()
    res.redirect('back')
}

//this is to view employee details by Admin
module.exports.addEmployes = function(req,res){
    res.render('home_addemployes',{
        title:'addEmploye'
    })
}