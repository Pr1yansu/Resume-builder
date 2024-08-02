import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  quality?: number;
  priority?: boolean;
  draggable?: boolean;
}

const Image = ({
  src,
  alt,
  className,
  width,
  height,
  onClick,
  quality,
  priority,
  draggable = false,
  ...props
}: ImageProps) => {
  return (
    <img
      src={src + (quality ? `?q=${quality}` : "")}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onClick={onClick}
      draggable={draggable}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
};

export default Image;
