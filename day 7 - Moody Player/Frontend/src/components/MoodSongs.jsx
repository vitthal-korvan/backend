import { useState } from "react";
import "./moodSongs.css";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Mood Songs</h2>

      {Songs.map((song, index) => (
        <div key={index} className="song">
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="play-pause-button">
            {
              isPlaying === index &&
            <audio
              src={song.audio}
              style={{ display: "none" }}
              autoPlay={isPlaying === index}
            ></audio>
            
            }
            <button onClick={() => handlePlayPause(index)}>
              {isPlaying === index ? (
                <i className="ri-pause-large-line"></i>
              ) : (
                <i className="ri-play-large-line"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
