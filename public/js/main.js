const output = document.querySelector('#output');
const postBtn = document.querySelector('#get-posts-btn');
const delBtn = document.querySelector('#get-del-btn');
const updateBtn = document.querySelector('#get-update-btn');
const form = document.querySelector('#add-post-form');

// get and show posts
async function showPosts() {
    try {
        const content = await fetch('http://localhost:8000/api/posts');
        if (!content.ok) throw new Error('Failed to fetch posts');

        const posts = await content.json();
        output.innerHTML = '';

        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.textContent = "id: " + post.id + " Title: " + post.title;
            output.appendChild(postElement);
        });
    } catch (error) {
        console.log('Error fetching posts: ', error);
    }
}
//Event listener
postBtn.addEventListener('click', showPosts);

// submit new post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('Title'); // the value inside get is from name attr of input tag

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title}),
        });

        if(!res.ok) throw new Error('Failed to add post');
        const newPost = await res.json();


        const postElement = document.createElement('div');
        postElement.textContent = newPost.title;
        output.appendChild(postElement);

        showPosts(); // to show all the post after creating new
    } catch (error) {
        console.log('Error adding posts');
    }
}
//event listener for above function
form.addEventListener('submit', addPost);

// delete post
async function deletePost() {
    let id = prompt("Enter the Id of post");
    try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'DELETE'
        });

        if(!res.ok) throw new Error("Failed to delete post");
        showPosts();
    } catch (error) {
        console.log('Error deleting posts, Try again later!')
    }
}
// event listener
delBtn.addEventListener('click', deletePost);

async function updatePost() {
    let id = prompt("Enter the ID of the post");
    let title = prompt("Enter the updated title");

    try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title }),
        })
        if(!res.ok) throw new Error('Failed to update post');
        showPosts();
    } catch (error) {
        console.log("Error updating post");
    }
}
// event listener
updateBtn.addEventListener('click', updatePost);