import { Modal } from "antd";
import { useState } from "react";
import type { Product } from "../types/product.type";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (product: Product) => void;
};

export default function ProductModal({ open, onClose, onAdd }: Props) {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        thumbnail: "",
        description: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };
    const isFormValid =
        newProduct.title.trim() !== "" &&
        newProduct.thumbnail.trim() !== "" &&
        Number(newProduct.price) > 0;

    const handleSubmit = () => {
        if (!isFormValid) {
            alert("Bütün sahələri doldurun");
            return;
        }

        const productToAdd: Product = {
            id: Date.now(),
            title: newProduct.title,
            price: Number(newProduct.price),
            thumbnail: newProduct.thumbnail,
            description: newProduct.description
        };

        onAdd(productToAdd);

        setNewProduct({ title: "", price: "", thumbnail: "", description: "" });
        onClose();
    };

    return (
        <Modal
            title="Add Product"
            open={open}
            onOk={handleSubmit}
            onCancel={onClose}
        >
            <div className="flex flex-col gap-4 pt-2">
                <input
                    name="title"
                    value={newProduct.title}
                    onChange={handleChange}
                    placeholder="Product title"
                    className="border p-3 rounded-xl"

                />

                <input
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="Price"
                    className="border p-3 rounded-xl"
                />

                <input
                    name="thumbnail"
                    value={newProduct.thumbnail}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="border p-3 rounded-xl"
                />
            </div>
        </Modal>
    );
}