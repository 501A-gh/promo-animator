import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const Camera = () => {
  const { camera } = useThree();
  const target = new Vector3(10, 10, 10); // Example target

  useFrame(() => {
    // Example: Move the camera towards a target
    camera.position.lerp(target, 0.1); // Smoothly move towards the target
    camera.lookAt(target); // Make the camera look at the target
  });

  return null;
};
