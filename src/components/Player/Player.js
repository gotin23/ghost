import React from "react";
import ReactPlayer from "react-player/lazy";
const Player = ({autoplay}) => {
  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
        controls={true}
      />
    </>
  );
};

export default Player;
