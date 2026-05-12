

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../types/product.type";
import ProductService from "../../services/ProductService";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined
} from "@ant-design/icons";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
  const localProduct =
    savedProducts.find((item: Product) => item.id === Number(id)) || null;

  const [product, setProduct] = useState<Product | null>(localProduct);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!localProduct && id) {
      ProductService.getProductById(id)
        .then((response) => setProduct(response.data))
        .catch(() => console.error("Xeta bas verdi"));
    }
  }, [id, localProduct]);

  const handleDelete = () => {
    if (!id) return;

    const currentProducts = JSON.parse(localStorage.getItem("products") || "[]");

    const filteredProducts = currentProducts.filter(
      (item: Product) => item.id !== Number(id)
    );

    localStorage.setItem("products", JSON.stringify(filteredProducts));

    ProductService.deleteProduct(id)
      .then(() => navigate("/Product"))
      .catch(() => navigate("/Product"));
  };

  const handleEdit = () => setIsEditing(true);

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!product) return;

    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSave = () => {
    if (!product || !id) return;

    ProductService.updateProduct(id, {
      title: product.title,
      price: product.price,
      description: product.description,
    }).then(() => {
      const currentProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );

      const newProducts = currentProducts.map((item: Product) =>
        item.id === Number(id) ? product : item
      );

      localStorage.setItem("products", JSON.stringify(newProducts));

      setProduct(product);
      setIsEditing(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center .bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 p-4 sm:p-6">
      {product ? (
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-all duration-300">

          <div className="relative .bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6 sm:p-10">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-52 sm:h-72 object-contain drop-shadow-xl hover:scale-105 transition duration-500"
            />

            <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-md">
              ${product.price}
            </span>
          </div>

        
          <div className="p-5 sm:p-8 flex flex-col justify-between gap-6">

            <div className="space-y-4 sm:space-y-5">
              {isEditing ? (
                <div className="space-y-3 sm:space-y-4">
                  <input
                    name="title"
                    value={product.title}
                    onChange={handleUpdate}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleUpdate}
                    className="w-full border border-gray-300 rounded-xl p-3 h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleUpdate}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800 leading-tight">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-1 text-yellow-400 text-base sm:text-lg">
                    ⭐⭐⭐⭐⭐
                    <span className="text-gray-500 text-xs sm:text-sm ml-2">
                      (4.9)
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {product.description}
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition"
                >
                  <EditOutlined /> Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md transition"
                >
                  <SaveOutlined /> Save
                </button>
              )}

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-md transition"
              >
                <DeleteOutlined /> Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-lg animate-pulse">
          Loading product...
        </div>
      )}
    </div>
  );
}

export default ProductDetail;