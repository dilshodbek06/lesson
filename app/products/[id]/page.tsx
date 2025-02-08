import { createClient } from "@/utils/supabase/server";

import ProductDetail from "./_components/product-detail";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const supabase = await createClient();
  const { id } = await params;
  const { data } = await supabase.from("Product").select("*").eq("id", id);

  return (
    <div className="container p-3">
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
