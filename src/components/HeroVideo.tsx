import React from 'react';

interface HeroVideoProps {
  videoSrc: string;
  children: React.ReactNode;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ videoSrc, children }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoSrc}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-60 z-10"></div>
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {children}
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
