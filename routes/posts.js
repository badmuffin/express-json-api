import express from "express";
import {
    getPosts, getPost,
    createPost, updatePost,
    deletePost
} from '../controller/postController.js'
const router = express.Router();

// to get all posts
router.get("/", getPosts);

// to get a single post
router.get("/:id", getPost);

// create new post
router.post('/', createPost);

// update post
router.put('/:id', updatePost);

// delete post
router.delete('/:id', deletePost);

export default router;