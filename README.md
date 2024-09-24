# Music Discovery App

## Description

The **Music Discovery Playlist Builder** is a web application designed for music enthusiasts to search for songs and artists, explore music details, and create personalized playlists. 

The app integrates with the iTunes API to fetch song data and allows users to add their favorite tracks to a playlist, manage the playlist by removing or clearing songs, and persist their selections across sessions using local storage. 

The Lyrics.ovh API provides access to song lyrics, allowing users to retrieve lyrics for specific tracks by artist and song title. This integration enables your application to display the lyrics alongside the song data fetched from the iTunes API, enhancing the user experience by allowing them to view and sing along to their favorite songs. 

The application features a dark, modern, and responsive UI built with Tailwind CSS and Font Awesome.


https://github.com/user-attachments/assets/f559aec8-2940-47b7-a6bd-78280ce50104


Please, visit our website [here](https://rennancruz.github.io/music-discovery-app/).

## Technologies Used

- **HTML5** - Structure of the web application.
- **CSS3 with Tailwind CSS** - Styling for a dark, modern, and responsive user interface.
- **JavaScript** - Functionality for searching, managing playlists, and interacting with the API.
- **iTunes Search API** - Fetching song and artist data.
- **Font Awesome** - Icons used throughout the application.
- **Local Storage** - Storing playlist data to persist user selections.

## Features

- **Music Search:** Users can search for songs or artists using the iTunes API.
- **Dynamic Results Display:** Search results are dynamically displayed with left-aligned text for easy readability.
- **Add to Playlist:** Users can add songs to their personalized playlist with a single click.
- **Manage Playlist:** Users can remove individual songs or clear the entire playlist with dedicated buttons.
- **Persistent Data:** Playlists are saved using local storage, allowing users to maintain their playlists across sessions.
- **Responsive Design:** Fully responsive layout that adapts to different devices and screen sizes.
- **Interactive Modals (Future Feature):** Plan to use modals for additional song or artist information.

## Usage

1. **Search for Music:**

   - Enter a song name or artist in the search bar and click the **Search** button.
   - View the search results dynamically displayed below the search bar.

2. **Add Songs to Playlist:**

   - Click the **Add to Playlist** button next to any song to add it to your personalized playlist.

3. **Manage Your Playlist:**
   - Navigate to the **Playlist** page to view all your saved songs.
   - Use the **Remove** button next to any song to remove it from the playlist.
   - Use the **Clear Playlist** button to remove all songs from your playlist.

## Roadmap

- **Integrate Additional API:** Implement a new API to enhance the application's functionality. Potential integrations could include:
  - **Lyrics API:** Display song lyrics directly within the app for a more immersive music experience.
  - **Music Metadata API:** Provide users with in-depth information about tracks, albums, and artists, such as release dates, genres, and chart positions.
  - **Related Songs or Artist API:** Suggest similar songs or artists to users based on their current selections to improve music discovery.
- **Add Interactive Modals:** Display additional information such as lyrics or artist bios using modals.
- **User Authentication:** Implement user authentication to allow users to save playlists across devices.
- **Advanced Search Filters:** Provide filters for genre, release date, and popularity.
- **Voice Search:** Add a voice search feature for enhanced interactivity.
- **Social Sharing:** Enable users to share playlists on social media.

## Acknowledgments

- **iTunes Search API** for providing music data.
- **Tailwind CSS** and **Font Awesome** for the UI design and icons.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
