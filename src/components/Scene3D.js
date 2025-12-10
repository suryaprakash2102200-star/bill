"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    sphereRef.current.rotation.x = t * 0.1;
    sphereRef.current.rotation.y = t * 0.15;
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={3.5}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
        metalness={0.3}
        transparent
        opacity={0.15}
      />
    </Sphere>
  );
}

export default function Scene3D() {
  return (
    <div 
      className="absolute inset-0" 
      style={{ 
        zIndex: 0,
        opacity: 1,
        pointerEvents: 'none'
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
