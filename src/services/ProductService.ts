
import AxiosInstance from "./AxiosInstance";

const ProductService = {
  getAllProducts: () =>  AxiosInstance.get("/products"),

  getProductById: (id: string | number) => AxiosInstance.get(`/products/${id}`),

  updateProduct: (
    id: string | number,
    data: {
      title: string;
      price: number;
      description: string;
      category?: string;
    }
  ) => 
    AxiosInstance.put(`/products/${id}`, data),

  deleteProduct: (id: string | number) => 
    AxiosInstance.delete(`/products/${id}`),
};

export default ProductService;
