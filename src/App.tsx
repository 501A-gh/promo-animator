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
  const { duration, keyframes } = data;

  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const skipToNextKeyframe = () => {
    const nextKeyframeTime = keyframes.find((k) => k.time > time)?.time || 0;
    setTime(nextKeyframeTime);
  };

  const skipToPreviousKeyframe = () => {
    const previousKeyframeTime = keyframes.reduce(
      (prev, curr) => (curr.time < time ? curr.time : prev),
      0,
    );
    setTime(previousKeyframeTime);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="grid grid-cols-5 h-fit border-b border-zinc-800">
          <div className="col-span-2 flex flex-col">
            <div className="flex-1 flex justify-center items-center bg-gradient-to-t from-zinc-950 via-zinc-900 to-zinc-950">
              <Canvas
                className="my-auto"
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
            <div className="flex justify-between items-center py-2 px-3 gap-3 text-black dark:text-white text-sm">
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => {
                    if (time === duration) setTime(0);
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  disabled={time === 0 || isPlaying}
                  onClick={() => {
                    setTime(0);
                  }}
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-0.5">
                <button onClick={() => skipToPreviousKeyframe()}>
                  Previous
                </button>
                <button onClick={() => skipToNextKeyframe()}>Next</button>
              </div>
            </div>
          </div>
          <Canvas
            className="col-span-3 border-l border-zinc-800 w-full"
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
          <Timeline
            data={data}
            time={time}
            isPlaying={isPlaying}
            setTime={setTime}
            setIsPlaying={setIsPlaying}
          />
        </div>

        <span className="font-mono">
          {Number(time).toFixed(2)}/{duration}
        </span>
      </div>
      <aside className="flex flex-col min-w-72 border-l border-zinc-800 h-screen"></aside>
    </div>
  );
}

export default App;
