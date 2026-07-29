import { useState } from "react";
import { CN } from "../../utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}


const ProductGallery: React.FC<ProductGalleryProps>= ({
  images,
  title,
}) => {

  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [];

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={safeImages[active]}
          alt={`${title} — image ${active + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 p-4">
          {safeImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={CN(
                "aspect-square overflow-hidden rounded-lg ring-2 transition-colors duration-200",
                active === index
                  ? "ring-indigo-600"
                  : "ring-transparent hover:ring-gray-300",
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={active === index}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
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
