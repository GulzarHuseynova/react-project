// import { useEffect, useState } from 'react'
// import type { Product } from '../../types/product.type'
// import ProductService from '../../services/ProductService'
// import { Link } from 'react-router-dom'
// import { Button, Modal } from 'antd';

// export default function Product() {
//     const [products, setProducts] = useState<Product[]>(() => {
//         const savedProducts = localStorage.getItem("products");
//         return savedProducts ? JSON.parse(savedProducts) : [];
//     });

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const showModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleOk = () => {
//         setIsModalOpen(false);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         if (products.length === 0) {
//             ProductService.getAllProducts()
//                 .then((response) => {
//                     setProducts(response.data.products);
//                     localStorage.setItem("products", JSON.stringify(response.data.products));
//                 })
//                 .catch(() => {
//                     console.error("Error bas verdi");
//                 });
//         }
//     }, [products.length]);

//     return (
//         <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {products.map((p) => (
//                 <Link key={p.id} to={`/product/${p.id}`}>
//                     <div className="group cursor-pointer overflow-hidden rounded-2xl border bg-white text-center shadow-md transition duration-300 hover:shadow-xl">
//                         <img src={p.thumbnail} alt="" />
//                         <h3 className="line-clamp-1 text-lg font-semibold text-gray-800">
//                             {p.title}
//                         </h3>
//                         <p className="text-lg font-bold text-black">{p.price}</p>
//                     </div>
//                 </Link>
//             ))}
//             <>
//                 <Button type="primary" onClick={showModal}>
//                     Open Modal
//                 </Button>
//                 <Modal
//                     title="Basic Modal"
//                     closable={{ 'aria-label': 'Custom Close Button' }}
//                     open={isModalOpen}
//                     onOk={handleOk}
//                     onCancel={handleCancel}
//                 >
//                    <div className="flex flex-col gap-3">
//             <input
//                 name="title"
//                 value={newProduct.title}
//                 onChange={handleChange}
//                 placeholder="Product title"
//                 className="border p-2 rounded"
//             />

//             <input
//                 name="price"
//                 value={newProduct.price}
//                 onChange={handleChange}
//                 placeholder="Price"
//                 type="number"
//                 className="border p-2 rounded"
//             />

//             <input
//                 name="thumbnail"
//                 value={newProduct.thumbnail}
//                 onChange={handleChange}
//                 placeholder="Image URL"
//                 className="border p-2 rounded"
//             />
//         </div>
//                 </Modal>
//             </>
//         </div>

//     )
// };

import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../types/product.type";
import ProductService from "../../services/ProductService";
import { Link } from "react-router-dom";
import ProductModal from "../../components/ProductModal";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/BasketSlice";


export default function Product() {
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem("products");
        return saved ? JSON.parse(saved) : [];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);


    const handleAddProduct = (product: Product) => {
        const updated = [...products, product];

        setProducts(updated);
        localStorage.setItem("products", JSON.stringify(updated));
    };


    const loadProducts = useCallback(async () => {
        try {
            const response = await ProductService.getAllProducts();
            const apiProducts: Product[] = response.data.products || [];

            const customProducts: Product[] = JSON.parse(
                localStorage.getItem("customProducts") || "[]",
            );

            const updatedProducts = JSON.parse(
                localStorage.getItem("updatedProducts") || "{}",
            );

            const deletedProductIds: number[] = JSON.parse(
                localStorage.getItem("deletedProductIds") || "[]",
            );

            const mergedApiProducts = apiProducts
                .filter((item) => !deletedProductIds.includes(item.id))
                .map((item) =>
                    updatedProducts[item.id]    
                        ? { ...item, ...updatedProducts[item.id] }
                        : item,
                );

            const finalProducts = [...customProducts, ...mergedApiProducts];

            setProducts(finalProducts);
            localStorage.setItem("products", JSON.stringify(finalProducts));
        } catch {
            alert("Xeta bas verdi, zehmet olmasa yeniden cehd edin");
        }
    }, []);

    useEffect(() => {
        queueMicrotask(() => {
            void loadProducts();
        });
    }, [loadProducts]);
    return (

        <div className="min-h-screen .bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
            <div className="flex justify-end mb-6">

                <Button
                    type="primary"
                    onClick={showModal}
                    className="h-11! px-6! rounded-xl! bg-blue-600 hover:bg-blue-700! shadow-md w-full sm:w-auto"
                >
                    + Add Product
                </Button>
            </div>
            <ProductModal
                open={isModalOpen}
                onClose={handleCancel}
                onAdd={handleAddProduct}
            />

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`}>
                        <div className="group flex flex-col justify-between cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white text-center shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                            <div className="h-44 flex items-center justify-center bg-gray-50 overflow-hidden">
                                <img
                                    src={p.thumbnail}
                                    alt={p.title}
                                    className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>


                            <div className="p-4 space-y-2 flex-1">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                    {p.title}
                                </h3>

                                <p className="text-indigo-600 font-bold text-lg">
                                    {p.price}$
                                </p>
                            </div>

                            <div className="p-4 pt-0">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(addToBasket(p));
                                    }}
                                    className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium
                                   hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"

                                >
                                    🛒 Add to Basket
                                </button>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}



