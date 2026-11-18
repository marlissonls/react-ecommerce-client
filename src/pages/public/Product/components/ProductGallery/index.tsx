import { useState } from "react";
import type { ProductImageView } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImageView[];
  title: string;
};

function ProductGallery({ images, title }: ProductGalleryProps) {
  const galleryImages = [...images].sort(
    (a, b) => a.position - b.position
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeImage =
    galleryImages.find((item) => item.url === selectedImage) ??
    galleryImages.find((item) => item.main) ??
    galleryImages[0];

  return (
    <div className="min-w-0">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F3F1EA]">
        {activeImage ? (
          <img
            src={activeImage.url}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-medium uppercase tracking-widest text-[#A0A49D]">
            Urbana
          </span>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6">
          {galleryImages.map((item) => (
            <button
              key={item.publicId}
              type="button"
              onClick={() => setSelectedImage(item.url)}
              aria-label={`Visualizar imagem de ${title}`}
              aria-pressed={activeImage?.url === item.url}
              className={`aspect-square overflow-hidden rounded-lg border-2 bg-[#F3F1EA] transition-colors ${
                activeImage?.url === item.url
                  ? "border-[#34483A]"
                  : "border-transparent hover:border-[#B8BDB5]"
              }`}
            >
              <img
                src={item.url}
                alt={title}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;