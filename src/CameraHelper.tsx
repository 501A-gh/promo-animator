import { Group, PerspectiveCamera } from "three";
import { AnimationData } from "./types";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getInterpolatedValues } from "./getInterpolatedValues";

export const CameraHelper: React.FC<{
  data: AnimationData;
  time: number;
  isPlaying: boolean;
  setTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}> = ({ data, time, isPlaying, setTime, setIsPlaying }) => {
  const cameraRef = useRef<Group>(null);
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  const { keyframes, duration } = data;

  useFrame((_, delta) => {
    if (isPlaying) {
      let newTime = time + delta;
      if (newTime > duration) {
        newTime = duration;
        setIsPlaying(false);
      }
      setTime(newTime);
    }

    const { position, rotation } = getInterpolatedValues(time, keyframes);
    if (cameraRef.current) {
      cameraRef.current.position.set(...position);
      cameraRef.current.rotation.set(...rotation);
    }
  });

  return (
    <group ref={cameraRef}>
      <cameraHelper args={[camera]} />
    </group>
  );
};
