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
    // songElement.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-200', 'p-2', 'rounded', 'mb-2'); // add styling later

    songElement.innerHTML = `
        <div class=""> 
            <p class="">${song.trackName}</p> 
            <p class="">${song.artistName}</p> 
        </div>
        <button class="" onclick="removeFromPlaylist(${index})"> 
            <i class="fas fa-minus"></i> remove 
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
