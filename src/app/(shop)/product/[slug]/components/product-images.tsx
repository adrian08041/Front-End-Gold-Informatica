"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}
export const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col lg:min-h-full lg:w-3/5">
      <div className="flex h-[380px] w-full items-center justify-center bg-backgroundItems lg:h-full lg:rounded-lg">
        <Image
          src={currentImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
        />
      </div>
      {/* botoes com as outras imagens */}
      <div className="mt-8 grid grid-cols-4 gap-4 px-5 lg:px-0">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[80px] items-center justify-center rounded-lg bg-backgroundItems ${imageUrl === currentImage && "border-2 border-solid border-dourado"} `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
