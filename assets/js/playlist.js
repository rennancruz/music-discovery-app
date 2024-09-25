document.addEventListener("DOMContentLoaded", displayPlaylist);

function displayPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
  playlistContainer.innerHTML = "";
  
  if (playlist.length === 0) {
    playlistContainer.innerHTML =
      '<p class="text-lg text-white">Your playlist is empty.</p>';
    return;
  }
  
  playlist.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.classList.add(
      "p-4",
      "bg-gray-800",
      "rounded-lg",
      "mb-4",
      "neon-box",
      "text-white"
    );

    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      song.trackName
    )}+${encodeURIComponent(song.artistName)}`;

    songElement.innerHTML = `
        <div class="text-center mb-4">
            <p class="text-lg font-bold">${song.trackName}</p>
            <p class="text-md">${song.artistName}</p>
        </div>
        <div class="flex justify-center space-x-4">
          <!-- Remove button styled like the 'Search' button -->
          <button class="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white rounded-lg px-4 py-2 glow-on-hover hover:scale-105 transform transition-transform ease-out duration-200 focus:outline-none focus:ring-4 focus:ring-blue-600"
                  onclick="removeFromPlaylist(${index})">
              <i class="fas fa-trash"></i> Remove
          </button>
          <!-- Lyrics button styled like 'Go To Playlist' -->
          <a href="lyrics.html?artist=${encodeURIComponent(song.artistName)}&title=${encodeURIComponent(song.trackName)}"
             class="bg-gradient-to-r from-green-400 to-blue-600 text-white rounded-lg px-4 py-2 glow-on-hover hover:scale-105 transform transition-transform ease-out duration-200 focus:outline-none focus:ring-4 focus:ring-green-500">
              <i class="fas fa-music"></i> Lyrics
          </a>
          <!-- YouTube button styled same as the 'Lyrics' button -->
          <a href="${youtubeSearchUrl}"
             class="bg-gradient-to-r from-green-400 to-blue-600 text-white rounded-lg px-4 py-2 glow-on-hover hover:scale-105 transform transition-transform ease-out duration-200 focus:outline-none focus:ring-4 focus:ring-green-500" target="_blank">
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