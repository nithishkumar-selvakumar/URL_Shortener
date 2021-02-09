const express = require('express');
const app = express();
const bodyparser =require('body-parser');
const mongoose = require('mongoose');
const{urlmodel}=require('./models/urlshort1');

//db
mongoose.connect("mongodb://localhost:27017/myurlshortener1");
//middlewares
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended : true}))


app.get('/',function(req,res)
{
    let allurl = urlmodel.find(function(err,result)
    {
        res.render('home',{
            urlresult : result
        })
    })
    //res.render('home');
    console.log('home page!!');
})
app.post('/create',function(req,res)
{
    //create a short url
    //store it in db
    
    let urlshort1 = new urlmodel({
        longurl:req.body.longurl,
        shorturl:gen(),
        reference:req.body.reference
    })
    console.log(req.body.reference)
    urlshort1.save(function(err,data)
    {
        if(err) throw err;
        console.log(data);
        res.redirect('/');
    })
    
});
app.get('/:urlid',function(req,res)
{
    console.log(req.params.urlid);
    urlmodel.findOne({shorturl : req.params.urlid},function(err,data)
    {
        if(err) throw err;
        urlmodel.findByIdAndUpdate({_id:data.id},{$inc:{clickcount : 1}},function(err,updateddata)
        {
            if(err) throw err;
            res.redirect(data.longurl);
        })
       

    })
})
app.get('/delete/:id',function(req,res)
{
    urlmodel.findByIdAndDelete({_id:req.params.id},function(err,deletedata)
    {
        if(err) throw err;
        res.redirect('/')
    })
})

app.listen(3000,function()
{
    console.log('port running in 3000')

});

//create a function to create 5 digits random variable
function gen()
{
    var rand="";
    var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoqrstuvwxyz0123456789";
    var len= chars.length;
    for(var i=0;i<5;i++)
    {
        rand+= chars.charAt(
            Math.floor(Math.random()*len)
        );
    }
    console.log("rand value is:"+ rand);
    return rand
}