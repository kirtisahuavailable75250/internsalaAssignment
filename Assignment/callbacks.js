// Event listener for fetching and displaying posts using a callback
document.getElementById('callback-btn').addEventListener('click', function() {
    startCountdown(5, function() {
        fetchDataWithCallback(displayPostsCallback);
    });
});

// Function to start countdown from 5 seconds
function startCountdown(seconds, callback) {
    const resultDiv = document.getElementById('callback-result');
    resultDiv.textContent = `Starting in ${seconds} seconds...`;
    
    const countdownInterval = setInterval(() => {
        seconds--;
        if (seconds > 0) {
            resultDiv.textContent = `Starting in ${seconds} seconds...`;
        } else {
            clearInterval(countdownInterval); // Stop the countdown
            callback(); // Call the provided function (fetch data) after countdown
        }
    }, 1000);
}

// Function to fetch posts and simulate delay using callback
function fetchDataWithCallback(callback) {
    fetch('https://dummyjson.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            callback(data.posts); // Pass posts to the callback function
        })
        .catch(error => {
            displayErrorMessage("Error fetching data: " + error.message); // Display error after 5 seconds
        });
}

// Function to display posts with a structured format for callback
function displayPostsCallback(posts) {
    const resultDiv = document.getElementById('callback-result');
    resultDiv.textContent = '';  // Clear previous content

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
}

// Function to display error message in the callback result div
function displayErrorMessage(message) {
    const resultDiv = document.getElementById('callback-result');
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`; // Display error in red color
}
