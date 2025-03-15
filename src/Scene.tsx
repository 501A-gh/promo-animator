import { Canvas } from "@react-three/fiber";
import { CameraHelper } from "./CameraHelper";
import { OrbitControls } from "@react-three/drei";

export const Scene = () => (
  <Canvas
    className="border border-rose-500"
    style={{
      height: "100vh",
      width: "100vw",
    }}
  >
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial />
    </mesh>
    <ambientLight intensity={0.1} />
    <directionalLight position={[0, 0, 5]} color="red" />
    <CameraHelper />
    <OrbitControls />
  </Canvas>
);
