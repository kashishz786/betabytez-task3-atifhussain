const express = require("express");
const posts = require("../data/posts");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {

    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        category,
        author: req.user.id,
        createdAt: new Date()
    };

    posts.push(newPost);

    return res.status(201).json({
        message: "Post created successfully",
        post: newPost
    });

});
// Get All Posts
router.get("/", (req, res) => {

    return res.status(200).json({
        totalPosts: posts.length,
        posts
    });

});
// Get Logged-in User Posts
router.get("/my-posts", authMiddleware, (req, res) => {

    const myPosts = posts.filter(post => post.author === req.user.id);

    return res.status(200).json({
        totalPosts: myPosts.length,
        posts: myPosts
    });

});

// Get Single Post
router.get("/:id", (req, res) => {

    const postId = parseInt(req.params.id);

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    return res.status(200).json({
        post
    });

});
// Update Post
router.put("/:id", authMiddleware, (req, res) => {

    const postId = parseInt(req.params.id);

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    if (post.author !== req.user.id) {
        return res.status(403).json({
            message: "You can update only your own posts"
        });
    }

    const { title, content, category } = req.body;

    if (title) {
        post.title = title;
    }

    if (content) {
        post.content = content;
    }

    if (category) {
        post.category = category;
    }

    return res.status(200).json({
        message: "Post updated successfully",
        post
    });

});
// Delete Post
router.delete("/:id", authMiddleware, (req, res) => {

    const postId = parseInt(req.params.id);

    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    if (posts[postIndex].author !== req.user.id) {
        return res.status(403).json({
            message: "You can delete only your own posts"
        });
    }

    posts.splice(postIndex, 1);

    return res.status(200).json({
        message: "Post deleted successfully"
    });

});

module.exports = router;