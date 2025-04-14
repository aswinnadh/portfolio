import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Canvas
      onPointerDown={(e) => e.stopPropagation()} // Prevent pointer events from interfering with scrolling
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      <Environment preset="city" />

      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      {/* OrbitControls */}
      <OrbitControls
        enableZoom={false}
        enableRotate={!(isMobile || isTablet)} // Disable rotation on mobile and tablet
        enablePan={false}
      />
    </Canvas>
  );
};

export default TechIconCardExperience;
