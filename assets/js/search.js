async function searchMusic() {
  const searchInput = document.getElementById("search-input").value;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (searchInput.trim() === "") {
    resultsContainer.innerHTML =
      "<p class=''>Please enter a song or artist's name.</p>";
    return;
  }
  const itunesResponse = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchInput
    )}&entity=song&limit=100`
  );
  const itunesData = await itunesResponse.json();
  console.log(itunesData);
  if (itunesData.results.length === 0) {
    resultsContainer.innerHTML = '<p class="">No Results Found. </p>';
  } else {
    itunesData.results.forEach((results) => {
      const songElement = document.createElement("div");
      //songElement.classList.add()add styling later
      // songElement.getElementbyId("playlist-button").classList.add(fas fa-plus);
      songElement.innerHTML = `
        <div class=""> 
            <p class="">${results.trackName}</p> 
            <p class="">${results.artistName}</p> 
        </div>
        <button id="addPlaylist" class="" style="" onclick='addToPlaylist(${JSON.stringify(
          results
        )})'> 
            <i class="fas fa-plus"></i> ---- add to playlist 
        </button>
    
    `;
      resultsContainer.appendChild(songElement);
    });
  }
}
function addToPlaylist(song) {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || []; //
  playlist.push({
    trackName: song.trackName,
    artistName: song.artistName,
  });
  localStorage.setItem("playlist", JSON.stringify(playlist));
  alert("song added to playlist!");
}
