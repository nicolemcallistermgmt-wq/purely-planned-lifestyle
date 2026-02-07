import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSlideshowProps {
  images: string[];
  interval?: number;
  overlay?: string;
  className?: string;
}

const ImageSlideshow = ({
  images,
  interval = 6000,
  overlay = "bg-charcoal/65",
  className = "",
}: ImageSlideshowProps) => {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.8, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
};

export default ImageSlideshow;
