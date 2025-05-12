import Image from "next/image";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}
export const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={imageUrls[0]}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
        />
      </div>
      {/* botoes com as outras imagens */}
    </div>
  );
};

export default ProductImages;
