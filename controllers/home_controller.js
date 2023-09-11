module.exports.all = function(req,res){
    console.log(req.user)
    res.render('home',{
        title:'Logged In'
    })
}