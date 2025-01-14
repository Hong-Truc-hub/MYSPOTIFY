import axios from 'axios';

const clientID = 'e683466554354a9c9579ae364c243984'; // Client ID của bạn
const clientSecret = 'a5cb0c4d981843ac86d6b34a9f5dbb73'; // Client Secret của bạn

export const getToken = async () => {
  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Token:', tokenResponse.data.access_token);
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error getting token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchAlbum = async (albumID) => {
  try {
    const token = await getToken();
    const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return albumResponse.data;
  } catch (error) {
    console.error('Error fetching album:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Tạo Playlist
export const createPlaylist = async (userId, token) => {
  try {
    const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      name: 'My New Playlist',
      public: false,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};


// src/api/spotifyApi.js