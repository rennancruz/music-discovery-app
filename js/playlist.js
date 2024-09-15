
document.addEventListener('DOMContentLoaded', displayPlaylist); // wait for the document to fully load before displaying the playlist

function displayPlaylist() {
    const playlistContainer = document.getElementById('playlist'); // get the container element for the playlist
    const playlist = JSON.parse(localStorage.getItem('playlist')) || []; // retrieve the playlist from local storage or use an empty array if not found

    playlistContainer.innerHTML = ''; // clear the current content of the playlist container

    if (playlist.length === 0) { // check if the playlist is empty
        playlistContainer.innerHTML = '<p class="text-gray-500">your playlist is empty.</p>'; // display a message if the playlist is empty
        return; // exit the function
    }

    playlist.forEach((song, index) => { // iterate through each song in the playlist
        const songElement = document.createElement('div'); // create a new div element for each song
        songElement.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-200', 'p-2', 'rounded', 'mb-2'); // add css classes for styling the song element

        songElement.innerHTML = `
            <div class="text-left"> <!-- container for text content aligned to the left -->
                <p class="font-semibold text-gray-900">${song.trackName}</p> <!-- display the track name in dark text -->
                <p class="text-sm text-gray-700">${song.artistName}</p> <!-- display the artist name in slightly lighter dark text -->
            </div>
            <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="removeFromPlaylist(${index})"> <!-- button to remove the song from the playlist -->
                <i class="fas fa-minus"></i> remove <!-- minus icon and text for remove button -->
            </button>
        `;

        playlistContainer.appendChild(songElement); // add the song element to the playlist container
    });
}

function removeFromPlaylist(index) { // function to remove a song from the playlist
    const playlist = JSON.parse(localStorage.getItem('playlist')) || []; // retrieve the playlist from local storage
    playlist.splice(index, 1); // remove the song at the specified index
    localStorage.setItem('playlist', JSON.stringify(playlist)); // update the playlist in local storage
    displayPlaylist(); // refresh the playlist display
}

function clearPlaylist() { // function to clear the entire playlist
    localStorage.removeItem('playlist'); // remove the playlist from local storage
    displayPlaylist(); // refresh the playlist display
}
