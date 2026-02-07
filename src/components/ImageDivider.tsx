import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageSlideshow from "./ImageSlideshow";

interface ImageDividerProps {
  images: string[];
  quote: string;
  attribution?: string;
}

const ImageDivider = ({ images, quote, attribution }: ImageDividerProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
      <ImageSlideshow images={images} interval={5000} overlay="bg-charcoal/65" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <div className="h-px w-12 bg-gold/50 mx-auto mb-6" />
        <p className="text-xl md:text-2xl lg:text-3xl font-heading italic text-cream leading-relaxed">
          {quote}
        </p>
        {attribution && (
          <p className="text-sm text-hero-muted font-body mt-4 tracking-wide">{attribution}</p>
        )}
        <div className="h-px w-12 bg-gold/50 mx-auto mt-6" />
      </motion.div>
    </section>
  );
};

export default ImageDivider;
