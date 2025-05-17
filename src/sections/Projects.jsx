import React, { useState, Suspense } from "react";
import { myProjects } from "../constants";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import CanvasLoader from "../components/CanvasLoader";
import DemoComputer from "../components/models/ProjectModels/DemoComputer";
import TitleHeader from "../components/TitleHeader";
import { useMediaQuery } from "react-responsive";

const projectCount = myProjects.length;

const Projects = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });

  const MotionDiv = motion.div;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProject = myProjects[selectedProjectIndex];

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section id="work" className="flex-col app-showcase">
      <TitleHeader
        title="Featured Projects That Make An Impact"
        sub="Building solutions that solve real-world problems 🚀"
      />

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full items-center">
        {/* Left side project card */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <MotionDiv
            key={currentProject.title}
            className="card-border rounded-xl p-8 flex flex-col gap-4"
            whileHover={{
              rotateX: -10, // Slight upward rotation for 3D effect
              scale: 1.05, // Slight zoom effect on hover
              transformOrigin: "center", // Ensure scaling happens from the center
            }}
            transition={{
              type: "spring",
              stiffness: 300, // Adjust stiffness for smoother motion
              damping: 25, // Less damping for snappy but smooth effect
            }}
          >
            <div className="absolute top-0 right-0">
              <img
                src={currentProject.spotlight}
                alt="spotlight"
                className="w-full h-96 object-cover rounded-xl pointer-events-none"
              />
            </div>
            <div
              className="p-3 backdrop-filter backdrop:backdrop-blur-3xl w-fit rounded-lg"
              style={currentProject.logoStyle}
            >
              <img
                src={currentProject.logo}
                alt="logo"
                className="w-10 h-10 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-5 text-white-600 my-5 ">
              <p className="text-white text-2xl font-semibold animatedText">
                {currentProject.title}
              </p>
              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <div key={index} className="tech-logo">
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className=" flex gap-4">
                <a
                  href={currentProject.href}
                  className="flex items-center gap-2 cursor-pointer text-white-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Check Live Site</p>
                  <img
                    src="/images/icons/arrow-up.png"
                    alt="arrow"
                    className="w-3 h-3 "
                  />
                </a>
                <a
                  href={currentProject.github}
                  className="flex items-center gap-2 cursor-pointer text-white-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images/socialmedias/github.png"
                    alt="github"
                    className="w-6 h-6  object-contain"
                  />
                </a>
              </div>
            </div>
            <div className="flex justify-between items-center mt-7">
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("previous")}
              >
                <img
                  src="/images/icons/left-arrow.png"
                  alt="left"
                  className="w-4 h-4"
                />
              </button>
              <button
                className="arrow-btn"
                onClick={() => handleNavigation("next")}
              >
                <img
                  src="/images/icons/right-arrow.png"
                  alt="right"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </MotionDiv>
        </div>

        {/* Right side 3D model canvas */}
        {isDesktop && (
          <div className="rounded-lg h-96">
            <Canvas>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={isMobile ? 1.5 : isTablet ? 1.8 : 2} // Increased scale for mobile/tablet
                    position={[-0.1, -2.8, 0.5]}
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>

              {/* Controls for rotation, zoom, etc. */}
              <OrbitControls
                enableZoom={!(isMobile || isTablet)} // Disable zoom on mobile/tablet
                enableRotate={!(isMobile || isTablet)} // Disable rotation on mobile/tablet
                enablePan={false} // Disable panning
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
