var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");


router.get("/", function(req,res){
	res.render("landing");
});



//AUTH ROUTES

//show signup form
router.get("/register", function(req, res){
	res.render("register");
});

//handling user sign up
router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}),req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);		
			return res.render('register');
		}	
		passport.authenticate("local")(req, res, function(){
			req.flash("success","WELCOME to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});


//LOGIN ROUTES
//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//login logic
router.post("/login",passport.authenticate("local",
{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	// <%if (successRedirect) {%>
	// 	req.flash("success","Successfully logged in!");
	// <%}else{%>
	// 	req.flash("error","You dont have the permission to that");
	// <%}%>
}),function(req, res){
});

router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;
