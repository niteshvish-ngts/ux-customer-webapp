import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  image: string | StaticImageData;
  mobileTitleOverride?: string;
  href: string; 
};

export default function ServiceCard({ 
  title, 
  image, 
  mobileTitleOverride, 
  href 
}: ServiceCardProps) {
  const displayTitle = mobileTitleOverride || title;

  return (
    <Link 
      href={href}
      className="w-full sm:w-[195px] sm:h-[180px] flex flex-col items-center justify-center gap-2 bg-card text-card-foreground border border-sidebar-border rounded-4xl px-5 py-2 text-center transition hover:bg-muted"
    >
      <div className="relative w-14 h-14 sm:w-20 sm:h-20">
        <Image src={image} alt={displayTitle} fill className="object-contain" />
      </div>

      <p className="text-xs sm:text-body-sm font-body text-foreground leading-snug line-clamp-2">
        <span className="sm:hidden">{mobileTitleOverride || title}</span>
        <span className="hidden sm:inline">{title}</span>
      </p>
    </Link>
  );
}