const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
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
            postElement.textContent = post.title;
            output.appendChild(postElement);
        });
    } catch (error) {
        console.log('Error fetching posts: ', error);
    }
}
//Event listener
button.addEventListener('click', showPosts);

// submit new post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

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