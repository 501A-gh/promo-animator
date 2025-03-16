import { useState } from "react";
import animationData from "../public/animationData.json";
import { AnimationData } from "./types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Camera } from "./Camera";
import { CameraHelper } from "./CameraHelper";
import { AnimatedBox } from "./AnimatedBox";

function App() {
  const data = animationData as AnimationData;
  const { duration } = data;
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
        <div className="flex h-full *:flex-1">
          <Canvas
            className="border border-rose-500 w-full"
            style={{
              height: "500px",
            }}
          >
            <Camera
              data={data}
              time={time}
              isPlaying={isPlaying}
              setTime={setTime}
              setIsPlaying={setIsPlaying}
            />
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} color="red" />
            <gridHelper args={[20, 20, "#888888", "#444444"]} />
          </Canvas>
          <Canvas
            className="border border-rose-500 w-full"
            style={{
              height: "500px",
            }}
          >
            <AnimatedBox
              data={data}
              time={time}
              isPlaying={isPlaying}
              setTime={setTime}
              setIsPlaying={setIsPlaying}
            />
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} color="red" />
            <gridHelper args={[20, 20, "#888888", "#444444"]} />
            <CameraHelper
              data={data}
              time={time}
              isPlaying={isPlaying}
              setTime={setTime}
              setIsPlaying={setIsPlaying}
            />
            <OrbitControls />
          </Canvas>
        </div>
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
