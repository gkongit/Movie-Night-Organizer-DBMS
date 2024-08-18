document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const addMovieForm = document.getElementById('addMovieForm');
    const createEventForm = document.getElementById('createEventForm');
    const rsvpForm = document.getElementById('rsvpForm');
    const commentForm = document.getElementById('commentForm');

    function formDataToJson(formData) {
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Convert FormData to JSON object
            const formData = new FormData(registerForm);
            const formDataJson = formDataToJson(formData);
    
            try {
                // Perform the fetch request
                const response = await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(formDataJson),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                // Check if the response is ok (status in the range 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Parse the JSON response
                const result = await response.json();
                
                // Display the result message
                window.alert(result.message);
            } catch (error) {
                // Log the error to the console and alert the user
                console.error('Fetch error:', error);
                window.alert('An error occurred while processing your request. Please try again.');
            }
        });
    }
    
    // Function to convert FormData to a JSON object
    function formDataToJson(formData) {
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }
    

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(formDataToJson(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            alert("login successfully");
        });
    }

    if (addMovieForm) {
        addMovieForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(addMovieForm);
            const response = await fetch('/api/movies', {
                method: 'POST',
                body: JSON.stringify(formDataToJson(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            alert("Successfully added");
        });
    }

    if (createEventForm) {
        // Fetch and populate movie options
        fetch('/api/movies')
            .then(response => response.json())
            .then(data => {
                const movieSelect = document.getElementById('movie_id');
                data.movies.forEach(movie => {
                    const option = document.createElement('option');
                    option.value = movie.id;
                    option.textContent = movie.title;
                    movieSelect.appendChild(option);
                });
            });

        createEventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(createEventForm);
            const response = await fetch('/api/events', {
                method: 'POST',
                body: JSON.stringify(formDataToJson(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            alert(result.message);
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            const response = await fetch('/api/rsvps', {
                method: 'POST',
                body: JSON.stringify(formDataToJson(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            alert(result.message);
        });
    }

    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(commentForm);
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify(formDataToJson(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            alert(result.message);
        });
    }

    async function getUsers() {
        try {
            const response = await fetch('http://localhost:3000/users'); // Make a GET request to the back-end API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const users = await response.json(); // Parse the JSON response
            console.log(users); // Log the users to the console
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    
    // Call the function when the document is fully loaded
    getUsers();
});
