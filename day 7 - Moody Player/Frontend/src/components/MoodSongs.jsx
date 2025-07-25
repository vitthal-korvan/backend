import { useState } from "react";

const MoodSongs = () => {
  const [Songs, setSongs] = useState([
    {
      title: "test_title",
      artist: "test_artist",
      url: "test_url",
    },
    {
      title: "test_title2",
      artist: "test_artist2",
      url: "test_url2",
    },
    {
      title: "test_title3",
      artist: "test_artist3",
      url: "test_url3",
    },
  ]);
  return (
    <div className="mood-songs">
      <h2>Recommended Mood Songs</h2>

      {Songs.map((song, index) => (
        <div key={index}>
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="play-pause-button">
            <i className="ri-play-large-line"></i>
            <i className="ri-pause-large-line"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
