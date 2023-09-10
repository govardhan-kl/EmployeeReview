const express = require('express');
const port = 8088;
const app = express();

app.get('/',function(req,res){
    res.send('<h1>hello</h1>')
})

app.listen(port, function(err){
    if (err){
        console.log(`Error : ${err}`); // to embed variable inside  a string, we use bactick character. this is called interpolation
    }
    console.log(`Server is running on port : ${port}`);
})