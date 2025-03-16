import { Keyframe } from "./types";

// Helper function to linearly interpolate between keyframes
export const getInterpolatedValues = (t: number, keyframes: Keyframe[]) => {
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
