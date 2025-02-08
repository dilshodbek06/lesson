"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const CreatePage = () => {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  const router = useRouter();

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const myFile = event.target.files![0];
    const { data } = await supabase.storage
      .from("rasmlar")
      .upload(`products/product-${Date.now()}.jpg`, myFile);
    setImages([...images, data!.fullPath]);
  };

  const handleSave = async () => {
    setloading(true);
    try {
      await supabase
        .from("Product")
        .insert([{ title, description: desc, price: parseInt(price), images }])
        .select("*");
      setloading(false);
      router.push("/products");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="p-4 container flex justify-center items-center min-h-screen">
      <div className="min-h-[300px] max-w-[840px] w-full space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="title..."
          className="form-control"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          placeholder="desc..."
          className="form-control"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="price..."
          className="form-control"
        />
        <div>
          <div className="w-[200px] h-[200px]  rounded-md border-2 border-dashed mx-auto">
            <label
              htmlFor="image"
              className=" h-full w-full flex flex-col items-center justify-center"
            >
              <p>Upload photo</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM4 18.3851L5.76282 17H20V5H4V18.3851ZM13 11V15H11V11H8L12 7L16 11H13Z"></path>
              </svg>
              <input onChange={handleUpload} id="image" type="file" hidden />
            </label>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 items-center">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-[200px] h-[200px] rounded-md relative"
              >
                <Image
                  className="absolute rounded-md"
                  alt="product"
                  src={
                    "https://oibixqrekblfvfauasob.supabase.co/storage/v1/object/public/" +
                    image
                  }
                  fill
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            disabled={loading}
            onClick={handleSave}
            className="btn btn-dark w-full"
          >
            {loading ? "Loading..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
