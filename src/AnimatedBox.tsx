import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { AnimationData } from "./types";
import { getInterpolatedValues } from "./getInterpolatedValues";

export const AnimatedBox: React.FC<{
  data: AnimationData;
  time: number;
  isPlaying: boolean;
  setTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
}> = ({ data, time, isPlaying, setTime, setIsPlaying }) => {
  const meshRef = useRef<Mesh>(null);
  const { duration, keyframes } = data;

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
    if (meshRef.current) {
      meshRef.current.position.set(...position);
      meshRef.current.rotation.set(...rotation);
    }
  });

  // Clicking the box starts the animation
  const handleClick = () => {
    setIsPlaying(true);
  };

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};
