"use client";
import Tilt from 'react-parallax-tilt';

export default function TiltWrapper({ children, className }) {
  return (
    <Tilt 
      className={className} 
      tiltMaxAngleX={4} 
      tiltMaxAngleY={4} 
      glareEnable={true} 
      glareMaxOpacity={0.15} 
      glareColor="#39FF14" 
      glarePosition="all"
      transitionSpeed={1500}
      scale={1.02} /* Gives it a tiny pop toward the screen */
    >
      {children}
    </Tilt>
  );
}