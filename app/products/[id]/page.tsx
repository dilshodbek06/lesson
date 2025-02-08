import { createClient } from "@/utils/supabase/server";

import ProductDetail from "./_components/product-detail";

type Product = {
  title: string;
  description: string;
  price: number;
  images: string[];
};

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const supabase = await createClient();
  const { id } = await params;
  const { data } = await supabase
    .from("Product")
    .select("*")
    .eq("id", id)
    .returns<Product[]>();

  return (
    <div className="container p-3">
      <ProductDetail item={data!} />
    </div>
  );
};

export default ProductDetailPage;
