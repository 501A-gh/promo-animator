import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import animationData from "../public/animationData.json";
import { AnimationData, Keyframe } from "./types";

// Helper function to linearly interpolate between keyframes
const getInterpolatedValues = (t: number, keyframes: Keyframe[]) => {
  if (t <= keyframes[0].time) {
    return { position: keyframes[0].position, rotation: keyframes[0].rotation };
  }
  if (t >= keyframes[keyframes.length - 1].time) {
    return {
      position: keyframes[keyframes.length - 1].position,
      rotation: keyframes[keyframes.length - 1].rotation,
    };
  }
  for (let i = 0; i < keyframes.length - 1; i++) {
    const current = keyframes[i];
    const next = keyframes[i + 1];
    if (t >= current.time && t <= next.time) {
      const factor = (t - current.time) / (next.time - current.time);
      const interpPosition: [number, number, number] = [
        current.position[0] + factor * (next.position[0] - current.position[0]),
        current.position[1] + factor * (next.position[1] - current.position[1]),
        current.position[2] + factor * (next.position[2] - current.position[2]),
      ];
      const interpRotation: [number, number, number] = [
        current.rotation[0] + factor * (next.rotation[0] - current.rotation[0]),
        current.rotation[1] + factor * (next.rotation[1] - current.rotation[1]),
        current.rotation[2] + factor * (next.rotation[2] - current.rotation[2]),
      ];
      return { position: interpPosition, rotation: interpRotation };
    }
  }
  return { position: keyframes[0].position, rotation: keyframes[0].rotation };
};

export const AnimatedBox: React.FC<{
  time: number;
  isPlaying: boolean;
  setTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
}> = ({ time, isPlaying, setTime, setIsPlaying }) => {
  const meshRef = useRef<Mesh>(null);
  const { duration, keyframes } = animationData as AnimationData;

  useFrame((_, delta) => {
    if (isPlaying) {
      let newTime = time + delta;
      if (newTime > duration) {
        newTime = duration;
        setIsPlaying(false); // Stop playing at the end
      }
      setTime(newTime);
    }
    const { position, rotation } = getInterpolatedValues(time, keyframes);
    if (meshRef.current) {
      meshRef.current.position.set(position[0], position[1], position[2]);
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
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
