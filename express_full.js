var express = require("express");
var app     = express();
var path    = require("path");
const port = 80;
const setting   =   require("./site_setting.json");
const expressLayouts = require('express-ejs-layouts');
var price       =   require("./js_backend/price.js");

var timeout = require('connect-timeout');

app.use(timeout('5s'));

const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 30 * 1000, // 15 minutes
  max: 200 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);



//const helmet = require("helmet");
//app.use(helmet());

app.use(express.static(__dirname+"/"));

//set view engine
// app.use(expressLayouts);
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/',function(req,res){
//  res.sendFile(path.join(__dirname+'/html/index.html'));
//    // res.send("aaaa");
// });

app.get('/setting.js',function(req,res){
   res.send("var setting = "+JSON.stringify(setting)+";");
 });

 

app.get('/farms',function(req,res){
   var data = Array();
     data['setting']=Array();
     data['t']=new Date();

     data['setting']['swap'] =  JSON.parse(JSON.stringify(setting.swap));
     data['setting']['info'] =  JSON.parse(JSON.stringify(setting.info));
     data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
     data['setting']['website'] =  JSON.parse(JSON.stringify(setting.website));
     data["title"] = "Farm Liquidity";
     data["url"] = "Farms";
     
    res.render('pages/farm',{'data' :   data });
 });
 app.get('/farms_old',function(req,res){
  var data = Array();
    data['setting']=Array();
    data['t']=new Date();

    data['setting']['swap'] =  JSON.parse(JSON.stringify(setting.swap));
    data['setting']['info'] =  JSON.parse(JSON.stringify(setting.info));
    data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
    data['setting']['website'] =  JSON.parse(JSON.stringify(setting.website));
    data["title"] = "Farm Liquidity";
    data["url"] = "Farms";
    
   res.render('pages/farm_old',{'data' :   data });
});

 
 app.get('/',function(req,res){
   var data = Array();
   data['setting']=Array();
   data['t']=new Date();
   data["title"] = "Home";
   data["url"] = "Home";
   data['setting']['token'] = JSON.parse(JSON.stringify(setting.token));
    
    res.render('pages/home',{'data' : data});
 });

 app.get('/vote',function(req,res){
  var data = Array();
  data['t']=new Date();
  data['setting']=Array();
  data["title"] = "Vote";
  data["url"] = "Vote";
   res.render('pages/vote',{'data' : data});
});

app.get('/widget',function(req,res){
  var data = Array();
  var pid  = req.query.id;
  data['setting']=Array();
  data['t']=new Date();

  data['setting']['swap'] =  JSON.parse(JSON.stringify(setting.swap));
  data['setting']['info'] =  JSON.parse(JSON.stringify(setting.info));
  data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
  data['setting']['website'] =  JSON.parse(JSON.stringify(setting.website));
  data["title"] = "Farm Liquidity";
  data["url"] = "Farms";
  data['pid']=pid;
    res.render('pages/widget',{'data' : data});
 });

 app.get('/pools',function(req,res){
   var data = Array();
     data['setting']=Array();
     data['t']=new Date();
     data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
     data["title"] = "Staking token ";
     data["url"] = "Pools";
     
    res.render('pages/pool',{'data' :   data });
 });

 app.get('/staking',function(req,res){
  var data = Array();
    data['setting']=Array();
    data['stakinginfo']=JSON.parse(JSON.stringify(price.stakinginfo));
    data['stakinglen'] = price.stakingLen;

    //console.log(data['stakinginfo']);
    data['t']=new Date();
    data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
    data["title"] = "Staking Token  ";
    data["url"] = "Staking";
    
   res.render('pages/staking',{'data' :   data });
});

 app.get('/king',function(req,res){
  var data = Array();
    data['setting']=Array();
    data['t']=new Date();
    data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
    data["title"] = "King Cow";
    data["url"] = "King Cow";
    
   res.render('pages/king',{'data' :   data });
});

app.get('/affiliate',function(req,res){
  var data = Array();
    data['setting']=Array();
    data['t']=new Date();
    data['setting']['pid'] =  JSON.parse(JSON.stringify(setting.pid));
    data["title"] = "Affiliate";
    data["url"] = "Affiliate";
    
   res.render('pages/affiliate',{'data' :   data });
});

 app.get('/price',function(req,res){
   res.setHeader('Content-Type', 'application/json');
   //console.log(price)
   res.send(JSON.stringify(price));
 });


 app.get('/id/:id',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  //console.log()
  //console.log(price)
  res.cookie("up",req.params.id);
  res.send(req.params.id);
});



app.listen(port, () => console.info(`App listen on port ${port}`));