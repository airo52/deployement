
import React, { useState, useEffect, useRef } from "react";
const url = "http://streaming.tdiradio.com:8000/house.mp3";
const useAudio = ()=> {
   
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      audio.play();
      //playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = (Click) => {
    const ref = useRef('button');
  const [playing, toggle] = useAudio(url);
     if(Click){
        ref.current.click();
     }
  return (
    <div>
      <button ref={ref} onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;