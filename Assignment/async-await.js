document.getElementById('async-btn').addEventListener('click', async function() {
    try {
        await fetchPostsWithAsyncAwait();
    } catch (error) {
        document.getElementById('async-await-result').innerHTML = `<p style="color: red;">${error}</p>`;
    }
});

async function fetchPostsWithAsyncAwait() {
    const resultDiv = document.getElementById('async-await-result');
    resultDiv.textContent = "Loading...";

    try {
        const response = await Promise.race([
            fetch('https://dummyjson.com/posts').then(res => res.json()),
            new Promise((_, reject) => setTimeout(() => reject('Operation timed out'), 5000))
        ]);
        
        resultDiv.textContent = '';  // Clear loading text
        
        response.posts.forEach(post => {
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
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">${error}</p>`; // Display error message 
    }
}
