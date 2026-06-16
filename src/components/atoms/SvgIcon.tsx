import Image from 'next/image';

interface SvgIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SvgIcon({ src, alt, width = 400, height = 300, className = '' }: SvgIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`text-lavender-600 ${className}`}
      priority
    />
  );
}
