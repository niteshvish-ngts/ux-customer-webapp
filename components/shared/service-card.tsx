import Image, { StaticImageData } from "next/image";


type ServiceCardProps = {
  title: string;
  image: string | StaticImageData;
};


export default function ServiceCard({ title, image }: ServiceCardProps) {
  return (
    <div
      className="
        flex flex-col items-center justify-center gap-4
        bg-card text-card-foreground
        border border-border
        rounded-xl
        px-6 py-6
        text-center
        transition
        hover:bg-muted
      "
    >
      {/* IMAGE */}
      <div className="relative w-20 h-20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* TITLE */}
      <p className="text-body-sm font-body text-foreground">
        {title}
      </p>
    </div>
  );
}
