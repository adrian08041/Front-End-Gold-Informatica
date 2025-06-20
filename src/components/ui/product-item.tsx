import { ProductTotalPrice } from "@/helpers/product";

import Image from "next/image";

import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex max-w-[156px] flex-col gap-4">
        <div className="relative flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-backgroundItems">
          {/* imagem */}
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="max-w-[80%]: h-auto max-h-[70%] w-auto"
            style={{ objectFit: "contain" }}
            alt={product.name}
          />
          {product.discountPercentage > 0 && (
            <DiscountBadge
              variant={"secondary"}
              className="absolute left-2 top-2"
            >
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div>
          {/* texto */}

          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-white">
            {product.name}
          </p>

          <div className="flex items-center gap-2 text-white">
            {product.discountPercentage > 0 ? (
              <>
                <p className="truncate font-semibold lg:text-lg">
                  {" "}
                  R$ {Number(product.totalPrice)?.toFixed(2)}{" "}
                </p>
                <p className="truncate text-xs line-through opacity-75 lg:text-sm">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="truncate text-sm font-semibold">
                R$ {Number(product.basePrice)?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
