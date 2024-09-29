// Event listener for displaying posts using promises
document.getElementById('promise-btn').addEventListener('click', function() {
    displayPostsWithPromise();
});

// Function to display posts with a structured format for promise
function displayPostsWithPromise() {
    const resultDiv = document.getElementById('promise-result');
    resultDiv.textContent = "Loading..."; // Show loading while fetching

    fetchPostsWithPromise()
        .then(posts => {
            resultDiv.textContent = '';  // Clear loading text
            posts.forEach(post => {
                // Create HTML structure for each post
                const postHtml = `
                    <div class="post">
                        <div class="post-title">${post.title}</div>
                        <div class="post-body">${post.body}</div>
                        <div class="post-tags">
                            Tags: ${post.tags.map(tag => `<span>${tag}</span>`).join(' ')}
                        </div>
                        <div class="reactions">
                            <span>Likes: ${post.reactions.likes}</span>
                            <span>Dislikes: ${post.reactions.dislikes}</span>
                        </div>
                        <div class="views">
                            Views: <span>${post.views}</span>
                        </div>
                        <div class="user-id">
                            User ID: <span>${post.userId}</span>
                        </div>
                    </div>
                    <hr/>
                `;

                resultDiv.innerHTML += postHtml;
            });
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color: red;">${error}</p>`; // Show error message in red
        });
}

// Function to fetch posts and handle timeout using promise
function fetchPostsWithPromise() {
    return new Promise((resolve, reject) => {
        // Fetch the posts
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    resolve(data.posts); // Resolve the promise with the posts data
                }, 3000); // Simulate 3 seconds delay
            })
            .catch(error => reject("Error fetching data: " + error.message)); // Handle fetch error

        // Reject if the operation takes more than 5 seconds
        setTimeout(() => reject("Operation timed out"), 5000);
    });
}
