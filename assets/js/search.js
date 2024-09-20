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
    )}&entity=song&limit=25`
  );
  const itunesData = await itunesResponse.json();
  console.log(itunesData);

  if (itunesData.results.length === 0) {
    resultsContainer.innerHTML = '<p class="">No Results Found.</p>';
  } else {
    // Remove duplicates by using a Map to filter unique track and artist combinations
    const uniqueResults = new Map();

    itunesData.results.forEach((result) => {
      const uniqueKey = `${result.trackName}-${result.artistName}`.toLowerCase();

      if (!uniqueResults.has(uniqueKey)) {
        uniqueResults.set(uniqueKey, result);

        const songElement = document.createElement("div");
        songElement.classList.add(
          "p-4",
          "flex",
          "justify-between",
          "bg-gray-300",
          "rounded",
          "items-center",
          "mb-2"
        );

        songElement.innerHTML = `
          <div class="text-left"> 
              <p class="text-gray-800">${result.trackName}</p> 
              <p class="text-sm text-gray-800">${result.artistName}</p> 
          </div>
          <button id="addPlaylist" class="bg-blue-500 rounded px-3 py-1 flex text-sm text-white hover:bg-blue-600" style="flex-shrink:0;width:100px;" onclick='addToPlaylist(${JSON.stringify(
            result
          )})'> 
              <i class="fas fa-plus text-gray-900 mt-3.5"></i> Add To Playlist 
          </button>
        `;
        resultsContainer.appendChild(songElement);
      }
    });
  }
}

function addToPlaylist(song) {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

  // Check if the song already exists in the playlist
  const songExists = playlist.some(
    (track) => track.trackName === song.trackName && track.artistName === song.artistName
  );

  if (!songExists) {
    playlist.push({
      trackName: song.trackName,
      artistName: song.artistName,
    });
    localStorage.setItem("playlist", JSON.stringify(playlist));

    // Create the modal container
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal"; // Set an ID for easy removal
    modalContainer.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"; // Add styles for modal backdrop

    // Create the modal content
    modalContainer.innerHTML = `
      <div class="bg-white p-4 rounded shadow-lg">
        <!-- Modal Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Song Added To Playlist!</h2>
          <button class="text-gray-500 hover:text-gray-800" onclick="closeModal()">✖</button>
        </div>
        <!-- Modal Content -->
        <p>${song.trackName} was added to your playlist!</p>
        <!-- Modal Footer -->
        <div class="mt-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modalContainer);
  } else {
    alert(`${song.trackName} by ${song.artistName} is already in your playlist.`);
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove(); // Remove the modal from the DOM
  }
}