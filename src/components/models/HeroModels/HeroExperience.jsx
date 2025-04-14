import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import { Suspense } from "react";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import HeroCamera from "./HeroCamera";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
      <ambientLight intensity={0.2} color="#1a1a40" />
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet && !isMobile}
        enableRotate={!isTablet && !isMobile}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <HeroCamera isSmall={isSmall} isMobile={isMobile} isTablet={isTablet}>
          <group
            scale={isMobile ? 0.7 : 1}
            position={[0, -3.5, 0]}
            rotation={[0, -Math.PI / 4, 0]}
          >
            <Room />
          </group>
        </HeroCamera>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
