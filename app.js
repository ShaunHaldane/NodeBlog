const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require('lodash');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/NodeBlogDB");

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/Articles", (req, res) => {
    Post.find({}, function (err, posts) {
        res.render("Articles", {
            posts: posts
        })
    })
})

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/projects", (req, res) => {
    res.render("projects");
})

app.get("/eh33oper5", (req, res) => {
    res.render("eh33oper5");
})

app.post("/eh33oper5", (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
})

app.get("/posts/:postId", (req, res) => {
    const requestedPostId = req.params.postId;
    Post.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        })
    })
})

app.listen(3000, () => {
    console.log("server started on port 3000");
});