import { Canvas } from "@react-three/fiber";
import { CameraHelper } from "./CameraHelper";
import { OrbitControls } from "@react-three/drei";
import { AnimatedBox } from "./AnimatedBox";
// import { Camera } from "./Camera";

export const Scene: React.FC<{
  time: number;
  isPlaying: boolean;
  setTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}> = ({ time, isPlaying, setTime, setIsPlaying }) => {
  return (
    <Canvas
      className="border border-rose-500 w-full"
      style={{
        height: "500px",
      }}
    >
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>
      {/* <Test /> */}
      <AnimatedBox
        time={time}
        isPlaying={isPlaying}
        setTime={setTime}
        setIsPlaying={setIsPlaying}
      />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
      <gridHelper args={[20, 20, "#888888", "#444444"]} />
      <CameraHelper />
      <OrbitControls />
      {/* <Camera /> */}
    </Canvas>
  );
};
