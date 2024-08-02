import React from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card3D = ({ children, className }: Card3DProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const rotateXSpring = useSpring(0, { stiffness: 400, damping: 90 });
  const rotateYSpring = useSpring(0, { stiffness: 400, damping: 90 });

  const transform = useMotionValue(
    "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / height) * 20;
    const rotateY = ((x - width / 2) / width) * 20;

    rotateXSpring.set(rotateX);
    rotateYSpring.set(rotateY);

    transform.set(
      `perspective(1000px) rotateX(${rotateXSpring.get()}deg) rotateY(${rotateYSpring.get()}deg)`
    );
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(0);
    rotateYSpring.set(0);

    transform.set("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        `relative cursor-pointer border rounded-lg overflow-hidden`,
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      {children}
    </motion.div>
  );
};

export default Card3D;
