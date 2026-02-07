import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  src: string;
  overlay?: string;
  className?: string;
}

const VideoBackground = ({ src, overlay = "bg-charcoal/60", className = "" }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
};

export default VideoBackground;
