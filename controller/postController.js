import randomInteger from "random-int";

// they are comig from database
let posts = [
    { id: 1, title: "Post One" },
    { id: 2, title: "Post Two" },
    { id: 3, title: "Post Three" },
];
// they are for testing purpose


// @desc Get all posts or limited post based on the query
// @route GET /api/posts 
export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0)
        return res.status(200).json(posts.slice(0, limit));
    res.status(200).json(posts);
}

// @desc Get single post
// @route GET /api/posts/:id

export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`A post with id of ${id} was not found`);
        error.status = 404;
        return next(error); // in server file, the next will refer to errorHandler
    }
    res.status(200).json(post);
}

// @desc Create new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
    const newPost = {
        // id will start from 4 as we already have three posts with id 1, 2, 3
        id: randomInteger(4, 100), 
        title: req.body.title
    };

    if (!newPost.title) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(posts);
}

// @desc Update post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 400;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts); // to show all the posts
}

// @desc Delete post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 400;
        return next(error);
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
}

