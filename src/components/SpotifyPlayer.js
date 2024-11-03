import React, { useEffect, useState } from 'react';

const SpotifyPlayer = ({ token, trackUri }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (!window.Spotify || !token) return;

    const playerInstance = new window.Spotify.Player({
      name: 'Web Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5,
    });

    setPlayer(playerInstance);

    // Connect player to Spotify
    playerInstance.connect();

    // Event listeners
    playerInstance.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setDeviceId(device_id);
    });

    playerInstance.addListener('player_state_changed', state => {
      console.log('Player state changed:', state);
    });

    playerInstance.addListener('initialization_error', ({ message }) => { console.error('Initialization Error:', message); });
    playerInstance.addListener('authentication_error', ({ message }) => { console.error('Authentication Error:', message); });
    playerInstance.addListener('account_error', ({ message }) => { console.error('Account Error:', message); });
    playerInstance.addListener('playback_error', ({ message }) => { console.error('Playback Error:', message); });

    // Cleanup function to remove player on component unmount
    return () => {
      playerInstance.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!player || !deviceId || !trackUri) return;

    const playTrack = async () => {
      try {
        // Dừng bài nhạc hiện tại nếu có
        await fetch(`https://api.spotify.com/v1/me/player/pause`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Đợi một chút để đảm bảo bài nhạc đã dừng
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Phát bài nhạc mới
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [trackUri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Track is playing!');
      } catch (err) {
        console.error('Error playing track:', err);
      }
    };

    playTrack();
  }, [player, deviceId, trackUri, token]);

  return <div>Spotify Player</div>;
};

export default SpotifyPlayer;
