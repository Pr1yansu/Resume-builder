import React, { useEffect, useRef } from "react";
import { Item } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

interface VanishingCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Item[];
  className?: string;
}

const VanishingCarousel = ({
  items,
  className,
  ...props
}: VanishingCarouselProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalWidth = ref.current ? ref.current.scrollWidth / 3 : 0;
    controls.start({
      x: [0, -totalWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 10,
          ease: "linear",
        },
      },
    });
  }, [controls, items]);

  return (
    <Carousel
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ userSelect: "none" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-transparent pointer-events-none z-10" />
      <motion.div ref={ref} className="flex" animate={controls}>
        {items.concat(items).map((item, index) => (
          <CarouselItem key={index} className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </motion.div>
    </Carousel>
  );
};

export default VanishingCarousel;
