document
  .getElementById("lyricsForm")
  .addEventListener("submit", function (event) {
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
          lyricsDiv.textContent =
            "Error fetching lyrics. Please try again later.";
        });
    } else {
      lyricsDiv.textContent = "Please enter both artist and song title.";
    }
  });
