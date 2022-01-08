// Require express and create an instance of it
var mongoose = require('mongoose');
var express = require('express');
//var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
//const { string, number } = require('prop-types');
var app = express();


app.use(cors());

mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,});

// get reference to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!"); 
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

var UserSchema = mongoose.Schema({
    username: String,
    password: String
  });

  var SigninSchema = mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    Contact: String,
    username: String,
    password: String
  });

  var guideSchema = mongoose.Schema({
    Firstname: String,
    Lastname: String,
    aadhaar: Number,
    contact:Number,
    email: String,
    password: String,
    address:String,
    nationality:String,
    gender:String,
    education:String,
    experience:String,
    languages:String,
    skills:String,
    description:String,
    agreed:String
  })
  

/*var singinSchema = moo
    // hash the password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };*/
  




  var User = mongoose.model('users', UserSchema, 'users');

  var Signin = mongoose.model('signin', SigninSchema , 'signin');

  var Guide = mongoose.model('guide' , guideSchema, 'guide');

   console.log("here");
   var a = db.collection('users').count();
   console.log("a" + a);


// on the request to root (localhost:3000/)
 app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.post('/login',(req,res) => {
    console.log('Body', req.body);
    const data =req.body;
    console.log(data.username);
    console.log(data.password);
    
    const collection = db.collection('signin')
    const ans= collection.count({ "username" : data.username, "password" : data.password});

    ans.then(function(result) {
        console.log(result);

        
        if(result>0){
        res.setHeader("Content-Type", "text/html");
        res.status(200).send({ "msg" : "you are loged in "});
        res.end();
        }
        else{
            res.setHeader("Content-Type", "text/html");
            res.status(200).send({ "msg" : "Wrong user id or password "});
            res.end();
        }
    })
    
})


app.post('/signin',(req,res) => {
    console.log('Body', req.body);
    var datas = req.body
    console.log('data: ' +datas)
    
    const sign1 = new Signin(datas);
    sign1.save(function (err, ) {
        if (err) return console.error(err);
        console.log(` saved to collection.`);
    });
    
    res.json({
        msg: "we recevied your data"
    })
})

app.post('/guide',(req,res)=>{
    console.log('Body', req.body);
    var data =req.body;
    console.log('data: ' +data);
    const guide1 = new Guide(data);
    guide1.save(function (err, ) {
        if(err) return console.error(err);
        console.log(`saved to collection`)
    });
     
    res.json({
        msg: "done"
    })
})



// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

const port = process.env.port || 5000
// start the server in the port 3000 !
app.listen(port, function () {
    console.log('Example app listening on port .' + port);
});