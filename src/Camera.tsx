import { useFrame } from "@react-three/fiber";
import { AnimationData } from "./types";
import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { getInterpolatedValues } from "./getInterpolatedValues";

export const Camera: React.FC<{
  data: AnimationData;
  time: number;
  isPlaying: boolean;
  setTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}> = ({ data, time, isPlaying, setTime, setIsPlaying }) => {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
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
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault />
    </>
  );
};
