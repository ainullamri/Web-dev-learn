//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "This is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePageThis is HomePage";
const aboutContent = "This is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPageThis is ABoutPage";
const contactContent = "This is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact PageThis is Contact Page";

const composes = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render('home', {
        titleText: "Home",
        startText: homeStartingContent,
        newComposes: composes
    });

});

app.get("/about", function(req, res) {
    res.render('about', {
        titleText: "About",
        startText: aboutContent
    });
});

app.get("/contact", function(req, res) {
    res.render('contact', {
        titleText: "Contact",
        startText: contactContent
    });
});

app.get("/compose", function(req, res) {
    res.render('compose');
});


app.post("/compose", function(req, res) {
    const newItem = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    composes.push(newItem) //adding the new item to the global variable composes
    res.redirect("/");
});


app.get("/posts/:postTitle", function(req,res) {
    const requestedTitle = _.lowerCase(req.params.postTitle);

    composes.forEach(function(post) {
        const postTitleLower = _.lowerCase(post.title)

        if ( postTitleLower === requestedTitle) {
            res.render('post', {
                titleText: post.title,
                startText: post.content
            });
        }

    });

});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
