// src/components/Album.js
import React, { useEffect, useState } from 'react';
import { fetchAlbum } from '../api/spotifyApi';
import './Album.css'; // Import file CSS cho Album

const Album = ({ albumID }) => {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null); // Để theo dõi bài hát hiện tại

  useEffect(() => {
    const getAlbumData = async () => {
      try {
        const data = await fetchAlbum(albumID);
        setAlbum(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getAlbumData();
  }, [albumID]);

  const playTrack = (track) => {
  if (currentTrack) {
    // Kiểm tra xem track hiện tại có phải là track được phát hay không
    if (currentTrack.src === track.preview_url) {
      currentTrack.play(); // Nếu đúng, chỉ cần phát lại
      return;
    }
    currentTrack.pause(); // Dừng bài hát hiện tại nếu không phải
  }
  const audio = new Audio(track.preview_url); // Tạo đối tượng Audio với URL bản nhạc
  audio.play() // Phát nhạc
    .catch((error) => {
      console.error('Error playing audio:', error);
    }); // Xử lý lỗi khi phát
  setCurrentTrack(audio); // Lưu bài hát hiện tại vào state
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching album: {error.message}</div>;
  }

  return (
    <div className="album-container">
      <div className="album-header">
        <img src={album.images[0].url} alt={album.name} className="album-image" />
        <div className="album-info">
          <h2>{album.name}</h2>
          <p>Artist: {album.artists.map(artist => artist.name).join(', ')}</p>
          <p>Release Date: {album.release_date}</p>
          <p>Total Tracks: {album.total_tracks}</p>
        </div>
      </div>
      <h3>Tracks:</h3>
      <ul className="track-list">
        {album.tracks.items.map(track => (
          <li key={track.id} className="track-item">
            {track.name}
            <button onClick={() => playTrack(track)}>Preview</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Album;
