import { useState } from "react";
import { Scene } from "./Scene";
import animationData from "../public/animationData.json";
import { AnimationData } from "./types";

function App() {
  const { duration } = animationData as AnimationData;
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handler for slider changes (scrub through the timeline)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(parseFloat(e.target.value));
    setIsPlaying(false); // Pause when scrubbing manually
  };

  return (
    <>
      <div>
        <Scene
          time={time}
          isPlaying={isPlaying}
          setTime={setTime}
          setIsPlaying={setIsPlaying}
        />
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={time}
          onChange={handleSliderChange}
          className="w-full"
        />
        <button
          onClick={() => {
            if (time === duration) setTime(0);
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
}

export default App;
