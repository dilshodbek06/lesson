"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  item: unknown;
}

const ProductDetail = ({ item }: ProductDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2 items-center justify-center ">
        {item[0].images.map((url, ind) => (
          <div
            onClick={() => setCurrentImageIndex(ind)}
            key={ind}
            className={`relative w-[100px] h-[100px] ${
              ind === currentImageIndex
                ? "opacity-100 border-2 rounded-md border-blue-500"
                : "opacity-60"
            } `}
          >
            <Image
              alt="logo"
              src={
                "https://oibixqrekblfvfauasob.supabase.co/storage/v1/object/public/" +
                url
              }
              width={300}
              height={300}
              className="absolute rounded-md"
            />
          </div>
        ))}
      </div>
      <div>
        <Image
          alt="image"
          src={
            "https://oibixqrekblfvfauasob.supabase.co/storage/v1/object/public/" +
            item[0].images[currentImageIndex]
          }
          width={600}
          height={600}
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{item[0].title}</h1>
        <p className="text- font-medium">{item[0].description}</p>
        <b> Price: ${item[0].price} </b>
      </div>
    </div>
  );
};

export default ProductDetail;
