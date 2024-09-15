
async function searchMusic() { // function to search for music using the itunes api
    const searchInput = document.getElementById('search-input').value; // get the value entered by the user in the search input field
    const resultsContainer = document.getElementById('results'); // get the container element to display the search results
    resultsContainer.innerHTML = ''; // clear any previous results

    if (searchInput.trim() === '') { // check if the search input is empty
        resultsContainer.innerHTML = '<p class="text-red-500">please enter a search term.</p>'; // display a message if no search term is entered
        return; // exit the function
    }

    try {
        // fetch all songs by the artist using the itunes search api
        const itunesResponse = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchInput)}&entity=song&limit=100`); // make an api request to the itunes search api
        const itunesData = await itunesResponse.json(); // parse the response into json format

        if (itunesData.results.length === 0) { // check if no results are found
            resultsContainer.innerHTML = '<p class="text-gray-500">no results found.</p>'; // display a message if no results are found
        } else {
            itunesData.results.forEach(item => { // loop through each result returned from the api
                const songElement = document.createElement('div'); // create a new div element for each song
                songElement.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-200', 'p-2', 'rounded', 'mb-2'); // add css classes for styling the song element

                songElement.innerHTML = `
                    <div class="text-left"> <!-- container for text content aligned to the left -->
                        <p class="font-semibold text-gray-900">${item.trackName}</p> <!-- display the track name in dark text -->
                        <p class="text-sm text-gray-700">${item.artistName}</p> <!-- display the artist name in slightly lighter dark text -->
                    </div>
                    <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" style="flex-shrink: 0; width: 120px;" onclick='addToPlaylist(${JSON.stringify(item)})'> <!-- button to add the song to the playlist -->
                        <i class="fas fa-plus"></i> add to playlist <!-- plus icon and text for add button -->
                    </button>
                `;

                resultsContainer.appendChild(songElement); // add the song element to the results container
            });
        }
    } catch (error) {
        console.error('error fetching music data:', error); // log the error if there is an issue with fetching data
        resultsContainer.innerHTML = '<p class="text-red-500">an error occurred. please try again later.</p>'; // display an error message to the user
    }
}

function addToPlaylist(song) { // function to add a song to the playlist
    const playlist = JSON.parse(localStorage.getItem('playlist')) || []; // retrieve the playlist from local storage or use an empty array if not found
    playlist.push({ // add the new song to the playlist
        trackName: song.trackName, // set the track name
        artistName: song.artistName // set the artist name
    });
    localStorage.setItem('playlist', JSON.stringify(playlist)); // save the updated playlist to local storage
    alert('song added to playlist!'); // show an alert message to confirm the song was added
}
