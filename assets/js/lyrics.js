document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const artist = urlParams.get("artist");
  const title = urlParams.get("title");

  if (artist && title) {
    document.getElementById("artist").value = artist;
    document.getElementById("title").value = title;

    // Automatically submit the form to fetch lyrics if both artist and title are provided
    document.getElementById("lyricsForm").dispatchEvent(new Event('submit'));
  }
});

document.getElementById("lyricsForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const lyricsDiv = document.getElementById("lyrics");

  lyricsDiv.textContent = "Fetching lyrics...";

  if (artist && title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.lyrics) {
          lyricsDiv.textContent = data.lyrics;
        } else {
          lyricsDiv.textContent = "Lyrics not found. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        lyricsDiv.textContent = "Error fetching lyrics. Please try again later.";
      });
  } else {
    lyricsDiv.textContent = "Please enter both artist and song title.";
  }
});