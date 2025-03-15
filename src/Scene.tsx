import { Canvas } from "@react-three/fiber";
import { CameraHelper } from "./CameraHelper";

export const Scene = () => {
  return (
    <Canvas className="border border-rose-500">
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
      <CameraHelper />
    </Canvas>
  );
};
