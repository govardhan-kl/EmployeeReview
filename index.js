const express = require('express');
const port = 8088;
const app = express();

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

//setting layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extracting styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:"PerformanceReview",
    secret: 'performance',
    saveUninitialized: false, //this is for when a request is called without any login then we don't need to save any cokkie
    resave: false, //this is for when a request comes do we need to reqwite the session cokkies everytime
    cookie: {
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore( //this adds the session to DB
        {
            // mongooseConnection: db,
            autoRemove: 'disabled',
            mongoUrl: "mongodb://0.0.0.0:27017/EmployeeReview"
        },
        function(err){
            console.log(err || "connect mongodb setup ok")
        }
    )
}));

//we are telling the app to use paasport
app.use(passport.initialize()); 
app.use(passport.session()); //for maintaining sessions
app.use(passport.setAuthenticatedUser)



app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if (err){
        console.log(`Error : ${err}`); // to embed variable inside  a string, we use bactick character. this is called interpolation
    }
    console.log(`Server is running on port : ${port}`);
})