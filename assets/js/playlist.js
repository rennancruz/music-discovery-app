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
      "flex",
      "justify-between",
      "bg-gray-300",
      "rounded",
      "items-center",
      "mb-2"
    ); // add styling

    songElement.innerHTML = `
        <div class="text-left"> 
            <p class="text-gray-800">${song.trackName}</p> 
            <p class="text-sm text-gray-800">${song.artistName}</p> 
        </div>
        <div class="flex space-x-2">
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