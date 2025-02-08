import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("Product").select("*");

  return (
    <div className="p-2 container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data!.map((product, index) => (
          <div
            key={index}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm "
          >
            <Image
              className=" rounded-t-lg"
              src={
                "https://oibixqrekblfvfauasob.supabase.co/storage/v1/object/public/" +
                product.images[0]
              }
              alt="product image"
              width={300}
              height={300}
            />
            <div className="px-5 pb-5">
              <Link href={`/products/${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                  {product.title}
                </h5>
              </Link>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  UZS {product.price}
                </span>
                <button className="btn btn-dark">cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
