import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import HeroCamera from "./HeroCamera";
import { Room } from "./Room";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <div className="hero-3d-container">
      <Canvas
        camera={{
          position: isMobile || isTablet ? [0, 0, 10] : [0, 0, 20], // Adjust for mobile/tablet
          fov: isMobile || isTablet ? 50 : 45, // Adjust FOV for mobile/tablet
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <ambientLight intensity={0.5} color="#1a1a40" />
        <directionalLight position={[10, 10, 10]} intensity={1} />
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
              <Room isMobile={isMobile} />
            </group>
          </HeroCamera>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
