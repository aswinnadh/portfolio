import { abilities } from "../constants";
import { motion } from "framer-motion";

const FeatureCards = () => {
  const MotionDiv = motion.div; // Explicit assignment

  return (
    <div className="w-full padding-x-lg">
      <div className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, title, desc }) => (
          <MotionDiv
            key={title}
            className="card-border rounded-xl p-8 flex flex-col gap-4"
            whileHover={{
              rotateX: -10,  // Slight upward rotation for 3D effect
              scale: 1.05,   // Slight zoom effect on hover
              transformOrigin: "center", // Ensure scaling happens from the center
            }}
            transition={{
              type: "spring",
              stiffness: 300,  // Adjust stiffness for smoother motion
              damping: 25,     // Less damping for snappy but smooth effect
            }}
          >
            <div className="size-14 flex items-center justify-center rounded-full">
              <img src={imgPath} alt={title} />
            </div>
            <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
            <p className="text-white-50 text-lg">{desc}</p>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
