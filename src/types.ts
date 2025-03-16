export type Keyframe = {
  time: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

export type AnimationData = {
  duration: number;
  keyframes: Keyframe[];
};
