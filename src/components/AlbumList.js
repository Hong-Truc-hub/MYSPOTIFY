// src/components/AlbumList.js
import React from 'react';
import Album from './Album';

const AlbumList = () => {
  const albumIDs = ['1lEFCQb1BVNwdsKmr7pgzT', '3tBjZA9YGTJVUUUq8d4tnb', '7C3WHnNZ5zcUutPtsB7KjD', '7rj8J20yLUzYS7ViXe35Dk']; // Thêm album ID ở đây

  return (
    <div style={{
      backgroundColor: '#e0f7fa', // Nền xanh nhạt cho toàn bộ container
      padding: '40px 0', // Tạo khoảng cách trên và dưới cho phần nền xanh
    }}>
      <h1 style={{
            textAlign: 'center', // Căn giữa tiêu đề
            fontSize: '3rem', // Kích thước chữ
            background: 'linear-gradient(to right, #6a11cb, #2575fc, #cc2b5e, #753a88)', // Màu gradient galaxy
            color: 'black', // Màu chữ đen
            margin: '20px 0', // Thêm khoảng cách trên và dưới tiêu đề
            padding: '20px', // Thêm khoảng cách bên trong tiêu đề
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)', // Hiệu ứng màu nhạt
            borderRadius: '10px', // Bo tròn các góc của tiêu đề
            backgroundColor: '#ffffff', // Nền trắng cho tiêu đề
          }}>
            Spotify
        </h1>


      {albumIDs.map(albumID => (
        <Album key={albumID} albumID={albumID} />
      ))}
    </div>
  );
};

export default AlbumList;
