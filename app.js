var express = require("express"),
  bodyParser = require("body-parser"),
  request = require('request'),
  db = require("./models"),
  passport = require("passport"),
  //session = require("cookie-session"),
  app = express();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// our root route
app.get("/", function (req, res) {
  res.render("sites/home");
});

app.get("/login", function (req, res) {
  res.render("users/login");
});

app.post("/login", function (req, res){
	console.log(req.body);
	res.redirect("/map");
})


app.get("/signup", function (req, res) {
  res.render("users/sign_up");
});

app.post("/signup", function (req, res) {
  console.log(req.body);
  db.users.createSecure(req.body.users.email, req.body.users.firstName, req.body.users.lastName, req.body.users.password_digest);
  res.redirect("/map");
  res.render("users/sign_up");
});

app.get("/map", function (req, res) {
  res.render("sites/map");
});

app.get("/map/ride/:id", function (req, res) {
  res.render("sites/map_ride");
});

app.get("/map/ride/new", function (req, res) {
  res.render("sites/new_ride");
});

app.get("/map/ride/new", function (req, res) {
  res.render("sites/ride");
});

app.get("/about", function (req, res) {
  res.render("sites/about");
});




// app.listen(3000, function () {
//   console.log(new Array("*").join());
//   console.log("STARTED ON localhost:3000");
// })


app.listen(process.env.PORT || 3000, function() {
	console.log("LISTENING")
})


// var express = require("express"),
//   bodyParser = require("body-parser"),
//   db = require("./models"),
//   passport = require("passport"),
//   session = require("cookie-session"),
//   request = request("request"),
//   app = express();

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: true}));


// /*
//   What is the session?

//   It is the object that lives in our app
//     and records relevant info about users
//     who are signed in
// */
// app.use(session( {
//   secret: 'thisismysecretkey',
//   name: 'chocolate chip',
//   // this is in milliseconds
//   maxage: 3600000
//   })
// );

// // get passport started
// app.use(passport.initialize());
// app.use(passport.session());

// /*
// SERIALizING
// Turns relevant user data into a string to be 
//   stored as a cookie
// */
// passport.serializeUser(function(user, done){
//   console.log("SERIALIZED JUST RAN!");

//   done(null, user.id);
// });

// /*
// DeSERIALizing

// Taking a string and turns into an object
//   using the relevant data stored in the session
// */
// passport.deserializeUser(function(id, done){
//   console.log("DESERIALIZED JUST RAN!");
//   db.user.find({
//       where: {
//         id: id
//       }
//     })
//     .then(function(user){
//       done(null, user);
//     },
//     function(err) {
//       done(err, null);
//     });
// });

// // WHEN SOMEONE WANTS THE SIGNUP PAGE
// app.get("/sign_up", function (req, res) {
//   res.render("users/sign_up");
// });

// // WHEN SOMEONE  SUBMITS A SIGNUP PAGE
// app.post("/users", function (req, res) {
//   console.log("POST /users");
//   var newUser = req.body.user;
//   console.log("New User:", newUser);
//   // CREATE a user and secure their password
//   db.user.createSecure(newUser.email, newUser.password, 
//     function () {
//       // if a user fails to create make them signup again
//       res.redirect("/sign_up");
//     },
//     function (err, user) {
//       // when successfully created log the user in
//       // req.login is given by the passport
//       req.login(user, function(){
//         // after login redirect show page
//         console.log("Id: ", user.id)
//         res.redirect('/users/' + user.id);
//       });
//     })
// });


// app.get("/users/:id", function (req, res) {
//   var id = req.params.id;
//   db.user.find(id)
//     .then(function (user) {
//       res.render("users/show", {user: user});
//     })
//     .error(function () {
//       res.redirect("/sign_up");
//     })
// });


// // When someone wants the login page
// app.get("/login", function (req, res) {
//   res.render("users/login");
// });

// // Authenticating a user
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));


// app.get("/", function (req, res) {
//   console.log(req.user)
//   // req.user is the user currently logged in

//   if (req.user) {
//     res.render("sites/home", {user: req.user});
//   } else {
//     res.render("sites/home", {user: false});
//   }
// });

// app.get("/logout", function (req, res) {
//   // log out
//   req.logout();
//   res.redirect("/");
// });

// app.listen(3000, function () {
//   console.log("LISTENING");
// })