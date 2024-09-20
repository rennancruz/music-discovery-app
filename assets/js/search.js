async function searchMusic() {
  const searchInput = document.getElementById("search-input").value;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  if (searchInput.trim() === "") {
    resultsContainer.innerHTML =
      "<p class='text-lg text-white'>Please enter a song or artist's name.</p>";
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
    resultsContainer.innerHTML =
      '<p class="text-lg text-white">No Results Found.</p>';
  } else {
    // Remove duplicates by using a Map to filter unique track and artist combinations
    const uniqueResults = new Map();
    itunesData.results.forEach((result) => {
      const uniqueKey =
        `${result.trackName}-${result.artistName}-${result.collectionName}`.toLowerCase();
      if (!uniqueResults.has(uniqueKey)) {
        uniqueResults.set(uniqueKey, result);
        const songElement = document.createElement("div");
        songElement.classList.add(
          "p-4",
          "flex",
          "justify-between",
          "bg-gray-800",
          "rounded-lg",
          "items-center",
          "mb-4",
          "text-white",
          "neon-box"
        );
        songElement.innerHTML = `
          <div class="text-left">
            <p class="text-lg font-bold">${result.trackName}</p>
            <p class="text-md">${result.artistName}</p>
            <p class="text-sm">${result.collectionName}</p>
          </div>
          <button id="addPlaylist" class="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white rounded-lg px-4 py-2 hover:scale-105 transition-transform ease-out duration-200 focus:outline-none focus:ring-4 focus:ring-blue-600 glow-on-hover" style="flex-shrink:0;width:120px;" onclick='addToPlaylist(${JSON.stringify(
            result
          )})'>
            <i class="fas fa-plus"></i> Add To Playlist
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
    (track) =>
      track.trackName === song.trackName && track.artistName === song.artistName
  );
  if (!songExists) {
    playlist.push({
      trackName: song.trackName,
      artistName: song.artistName,
      collectionName: song.collectionName,
    });
    localStorage.setItem("playlist", JSON.stringify(playlist));
    // Create the modal container for the "Song Added" message
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal"; // Set an ID for easy removal
    modalContainer.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"; // Add styles for modal backdrop
    // Create the modal content
    modalContainer.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <!-- Modal Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">Song Added To Playlist!</h2>
          <button class="text-gray-500 hover:text-gray-300" onclick="closeModal()">&times;</button>
        </div>
        <!-- Modal Content -->
        <p class="mt-2">${song.trackName} was added to your playlist!</p>
        <!-- Modal Footer -->
        <div class="mt-4">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;
    // Append the modal to the body
    document.body.appendChild(modalContainer);
  } else {
    // Create the modal container for the "Song Already Exists" message
    const existingSongModal = document.createElement("div");
    existingSongModal.id = "modal"; // Set an ID for easy removal
    existingSongModal.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"; // Add styles for modal backdrop
    // Create the modal content for the existing song warning
    existingSongModal.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <!-- Modal Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">Song Already Exists!</h2>
          <button class="text-gray-500 hover:text-gray-300" onclick="closeModal()">&times;</button>
        </div>
        <!-- Modal Content -->
        <p class="mt-2">${song.trackName} by ${song.artistName} is already in your playlist!</p>
        <!-- Modal Footer -->
        <div class="mt-4">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;
    // Append the modal to the body
    document.body.appendChild(existingSongModal);
  }
}
// Function to close the modal
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove(); // Remove the modal from the DOM
  }
}
