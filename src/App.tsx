import { useState } from "react";
import animationData from "../public/animationData.json";
import { AnimationData } from "./types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Camera } from "./Camera";
import { CameraHelper } from "./CameraHelper";
import { Timeline } from "./Timeline";
// import { AnimatedBox } from "./AnimatedBox";

function App() {
  const data = animationData as AnimationData;
  const { duration } = data;
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handler for slider changes (scrub through the timeline)
  const handleSliderChange = (v: number) => {
    setTime(v);
    setIsPlaying(false); // Pause when scrubbing manually
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 h-fit border-b border-blue-400">
          <div className="flex flex-col">
            <div className="flex-1 flex justify-center items-center">
              <Canvas
                className="border border-rose-500 my-auto rounded-md"
                style={{
                  aspectRatio: 16 / 9,
                  height: "fit-content",
                }}
              >
                <color attach="background" args={["#141622"]} />
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
            </div>
            <div className="flex justify-between items-center p-4 gap-3 text-black dark:text-white">
              <button onClick={() => setTime(0)}>Reset</button>
              <div className="flex items-center gap-3">
                <button>Previous Keyframe</button>
                <button>Next Keyframe</button>
              </div>
            </div>
          </div>
          <Canvas
            className="border border-rose-500 w-full"
            style={{
              height: "500px",
            }}
          >
            {/* <AnimatedBox
              data={data}
              time={time}
              isPlaying={isPlaying}
              setTime={setTime}
              setIsPlaying={setIsPlaying}
            /> */}
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
        <div className="p-2">
          <Timeline time={time} onChange={handleSliderChange} data={data} />
        </div>
        <button
          onClick={() => {
            if (time === duration) setTime(0);
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <span className="font-mono">
          {Number(time).toFixed(2)}/{duration}
        </span>
      </div>
    </>
  );
}

export default App;
