const AlbumDetails = ({ album }) => {
    return (
      <div>
        <h1>{album.name}</h1>
        <h2>{album.artists.map(artist => artist.name).join(', ')}</h2>
        <img src={album.images[0].url} alt={album.name} />
        <p>Release Date: {album.release_date}</p>
        <p>Total Tracks: {album.total_tracks}</p>
  
        <h3>Track List:</h3>
        <ul>
          {album.tracks.items.map(track => (
            <li key={track.id}>
              {track.name}
              <button onClick={() => playTrack(track.uri)}>Play</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const playTrack = (uri) => {
    // Call function to play the track using Spotify Player
  };
  