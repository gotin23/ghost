import YouTube from "react-youtube";
import { useRef, useEffect, useState } from "react";
const Player = () => {
  const videoId = "lKrLTQp5tK8";
  const youtube = useRef(null);
  const [test, setTest = useState(test)] = useState("");
  // const videoId = "LJ5kx_MQnjM?si=BHkI44leO4VWom1y";
  const foo = (e) => {
    e.target.playVideo();
  };
  const videoOptions = {
    whidth: "100%",
    playerVars: { autoplay: 0, control: 0 },
  };
  // console.log(youtube.current);
  // useEffect(() => {
  //   youtube.target.playVideo();
  // }, []);

  return (
    // <iframe

    //   className="video"
    //   title="Youtube player"
    //   frameborder="0"
    //   allowfullscreen
    //   src={`https://youtube.com/embed/elSs0KU2eJE?rel=0&autoplay=1&`}
    // ></iframe>
    // <iframe
    //   style={{ width: "100%", height: "100vh" }}
    //   //   src={`https://youtube.com/embed/elSs0KU2eJE?rel=0&autoplay=1&`}
    //   src={`https://youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0`}
    //   title="YouTube video player"
    //   frameborder="0"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
    //   referrerpolicy="strict-origin-when-cross-origin"
    //   allowfullscreen
    // ></iframe>
    // <iframe
    //   style={{ width: "100%", height: "100vh" }}
    //   src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=0&showinfo=1`}
    //   title="YouTube video player"
    //   frameborder="0"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; autohide"
    //   // referrerpolicy="strict-origin-when-cross-origin"
    //   allowfullscreen
    // ></iframe>

    <div className="cursor-pointer z-50  ">
      {/* <iframe
        style={{ width: "100%", height: "100vh" }}
        src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&controls=0&iv_load_policy=3`}
        frameborder="0"
        allowFullScreen
        ref={youtube}
      ></iframe> */}
      <YouTube videoId={videoId} opts={videoOptions} onStateChange={test} />
      <button onClick={() => setTest(test + "1")}>kdjdjdjdj</button>
      <button onClick={foo}>kdjdjdjdj</button>
    </div>
  );
};

export default Player;
