import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const HeroCamera = ({ isSmall, isMobile, isTablet, children }) => {
  const group = useRef();
  const [rotationDone, setRotationDone] = useState(false);
  const rotationTarget = [0, Math.PI / 8, 0];

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);

    if (!group.current) return;

    if (!rotationDone) {
      easing.dampE(group.current.rotation, rotationTarget, 0.4, delta);
      const currentY = group.current.rotation.y;
      if (Math.abs(currentY - rotationTarget[1]) < 0.001) setRotationDone(true);
    } else if (!isMobile && !isTablet) {
      const { x, y } = state.pointer;
      easing.dampE(group.current.rotation, [-y * 0.3, x * 0.5 + rotationTarget[1], 0], 0.3, delta);
    }
  });

  const scale = isSmall ? 0.8 : isMobile ? 1 : isTablet ? 1.1 : 1.3;

  return <group ref={group} scale={scale}>{children}</group>;
};

export default HeroCamera;
