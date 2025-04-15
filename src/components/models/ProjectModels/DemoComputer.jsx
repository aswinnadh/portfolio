import React, { useEffect, useRef } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DemoComputer = (props) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/computer.glb");
  const txt = useVideoTexture(
    props.texture ? props.texture : "/images/textures/project/project1.mp4"
  );

  useEffect(() => {
    if (txt) txt.flipY = false;
  }, [txt]);

  useGSAP(() => {
    gsap.from(group.current.rotation, {
      y: Math.PI / 2,
      duration: 1,
      ease: "power3.out",
    });
  }, [txt]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {Object.entries(nodes).map(([name, node]) => {
          if (node.type === "Mesh") {
            return (
              <mesh
                key={name}
                geometry={node.geometry}
                material={name === "monitor-screen" ? undefined : node.material}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
                castShadow
                receiveShadow
              >
                {name === "monitor-screen" && <meshBasicMaterial map={txt} />}
              </mesh>
            );
          } else if (node.type === "Group") {
            return <primitive key={name} object={node} />;
          }
          return null;
        })}
      </group>
    </group>
  );
};

export default DemoComputer;
