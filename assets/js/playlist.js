document.addEventListener("DOMContentLoaded", displayPlaylist);

function displayPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
  playlistContainer.innerHTML = "";

  if (playlist.length === 0) {
    // check if the playlist is empty
    playlistContainer.innerHTML = '<p class="">your playlist is empty.</p>';
    return;
  }

  playlist.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.classList.add(
      "p-4",
      "bg-gray-300",
      "rounded",
      "mb-2"
    ); // add styling

    // Create a YouTube search URL using the artist and song title
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.trackName)}+${encodeURIComponent(song.artistName)}`;

    songElement.innerHTML = `
        <div class="text-center mb-4"> 
            <p class="text-gray-800">${song.trackName}</p> 
            <p class="text-sm text-gray-800">${song.artistName}</p> 
        </div>
        <div class="flex justify-center space-x-2">
          <button class="bg-red-500 rounded p-1 flex items-center justify-center text-sm text-white hover:bg-red-600" 
                  style="flex-shrink:0;width:100px;" 
                  onclick="removeFromPlaylist(${index})"> 
              <i class="flex fas text-gray-900"></i> Remove 
          </button>
          <a href="lyrics.html?artist=${encodeURIComponent(song.artistName)}&title=${encodeURIComponent(song.trackName)}" 
             class="bg-blue-500 rounded p-1 flex items-center justify-center text-sm text-white hover:bg-blue-600" 
             style="flex-shrink:0;width:100px;">
              <i class="flex fas text-gray-900"></i> Lyrics
          </a>
          <a href="${youtubeSearchUrl}" 
             class="bg-green-500 rounded p-1 flex items-center justify-center text-sm text-white hover:bg-green-600" 
             style="flex-shrink:0;width:100px;" target="_blank">
              <i class="fas fa-play"></i> YouTube
          </a>
        </div>
    `;
    playlistContainer.appendChild(songElement);
  });
}

function removeFromPlaylist(index) {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
  playlist.splice(index, 1);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  displayPlaylist();
}

function clearPlaylist() {
  localStorage.removeItem("playlist");
  displayPlaylist();
}