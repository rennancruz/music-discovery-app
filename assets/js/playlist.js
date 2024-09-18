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
    ); // add styling later

    songElement.innerHTML = `
        <div class="text-left"> 
            <p class="text-gray-800">${song.trackName}</p> 
            <p class="text-sm text-gray-800">${song.artistName}</p> 
        </div>
        <button class="bg-red-500 rounded p-1 flex items-center justify-center text-sm text-white hover:bg-red-600" style="flex-shrink:0;width:100px;" onclick="removeFromPlaylist(${index})"> 
            <i class="flex fas text-gray-900"></i> Remove 
        </button>
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
