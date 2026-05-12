// import { useEffect, useState } from 'react'
// import type { Product } from '../../types/product.type';
// import ProductService from '../../services/ProductService';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     ProductService.getAllProducts()
//       .then((response) => {
//         setProducts(response.data.products)
//       })
//       .catch(() => {
//         console.error("Error bas verdi")
//       })
//   }, [])


//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 " >
//       {products.map(p => (
//         <Link key={p.id} to={`/product/${p.id}`}>
//           <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group cursor-pointer border text-center ">
//             <img src={p.thumbnail} alt="" />
//             <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{p.title}</h3>
//             <p className="text-black-600 font-bold text-lg">{p.price}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }
// import { useEffect, useState } from 'react'
// import type { Product } from '../../types/product.type'
// import ProductService from '../../services/ProductService'
// import { Link } from 'react-router-dom'

// export default function Home() {
//   const [products, setProducts] = useState<Product[]>(() => {
//     const savedProducts = localStorage.getItem("products");
//     return savedProducts ? JSON.parse(savedProducts) : [];
//   });

//   useEffect(() => {
//     if (products.length === 0) {
//       ProductService.getAllProducts()
//         .then((response) => {
//           setProducts(response.data.products);
//           localStorage.setItem("products", JSON.stringify(response.data.products));
//         })
//         .catch(() => {
//           console.error("Error bas verdi");
//         });
//     }
//   }, [products.length]);

//   return (
//     <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {products.map((p) => (
//         <Link key={p.id} to={`/product/${p.id}`}>
//           <div className="group cursor-pointer overflow-hidden rounded-2xl border bg-white text-center shadow-md transition duration-300 hover:shadow-xl">
//             <img src={p.thumbnail} alt="" />
//             <h3 className="line-clamp-1 text-lg font-semibold text-gray-800">
//               {p.title}
//             </h3>
//             <p className="text-lg font-bold text-black">{p.price}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }
import { Button, Card } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_52%,#7c3aed_100%)] px-6 py-8 text-white shadow-[0_20px_60px_rgba(37,99,235,0.24)] md:px-8 md:py-10">
        <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
          Dashboard Home
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">
              Dashboard ana səhifəsinə xoş gəlmisən
            </h1>
            <p className="m-0 max-w-xl text-base leading-8 text-slate-100/85">
              Məhsullar bölməsinə keçərək bütün məhsulları ayrıca səhifədə görə bilərsən.
            </p>
          </div>

          <Button
            type="primary"
            icon={<ShoppingOutlined />}
            onClick={() => navigate("/products")}
            className="h-12 rounded-2xl border-0 bg-white px-6 font-semibold text-slate-900 shadow-[0_12px_24px_rgba(255,255,255,0.18)]"
          >
            Products səhifəsinə keç
          </Button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Products", "Bütün məhsullar ayrıca Products səhifəsində göstərilir."],
          ["Detail", "Hər məhsulun detail səhifəsi ayrıca açılır."],
          ["CRUD", "Edit və Delete əməliyyatları detail səhifəsində edilir."],
        ].map(([title, text]) => (
          <Card
            key={title}
            className="rounded-24px border border-slate-200/70 bg-white/90 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="m-0 text-sm leading-6 text-slate-500">{text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}