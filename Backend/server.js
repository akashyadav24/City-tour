// Require express and create an instance of it
var mongoose = require('mongoose');
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const { string, number } = require('prop-types');
var app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true});

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
    User: String,
    password: String
  });
  

/*var singinSchema = moo
    // hash the password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };*/
  




  var User = mongoose.model('user', UserSchema, 'users');

  var Signin = mongoose.model('signin', SigninSchema , 'signin');

 
// on the request to root (localhost:3000/)
 app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.post('/login',(req,res) => {
    console.log('Body', req.body);

    const data =req.body;
    const user2 = new User(data);
    user2.save(function (err, User) {
        if (err) return console.error(err);
        console.log(`${User.username} saved to bookstore collection.`);
      });

    res.json({
        msg: "we recevied your data"
    })
})

app.post('/signin',(req,res) => {
    console.log('Body', req.body);

    var datas = req.body;
    console.log('data: ' +datas)
    const sign1 = new Signin(datas);
    sign1.save(function (err, ) {
        if (err) return console.error(err);
        console.log(` saved to bookstore collection.`);
      });

    res.json({
        msg: "we recevied your data"
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

// start the server in the port 3000 !
app.listen(5000, function () {
    console.log('Example app listening on port .' + '5000');
});
