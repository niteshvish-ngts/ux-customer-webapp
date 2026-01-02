import Image, { StaticImageData } from "next/image";

type ServiceCardProps = {
  title: string;
  image: string | StaticImageData;
};

export default function ServiceCard({ title, image }: ServiceCardProps) {
  return (
    <div
      className="
        w-full
        sm:w-[200px]  
        sm:h-[200px]          
        flex flex-col items-center justify-center gap-3
        bg-card text-card-foreground
        border border-sidebar-border
        rounded-lg
        px-6 py-2            
        sm:px-6 sm:py-2
        text-center
        transition
        hover:bg-muted
      "
    >
      {/* IMAGE */}
      <div className="relative w-14 h-14 sm:w-20 sm:h-20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* TITLE */}
      <p
        className="
          text-xs sm:text-body-sm
          font-body
          text-foreground
          leading-snug
          line-clamp-2
        "
      >
        {title}
      </p>
    </div>
  );
}
