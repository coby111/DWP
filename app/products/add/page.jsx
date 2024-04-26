"use client"

import { useState } from "react";
import { addProduct } from './action';

export default function AddProduct() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});


    function onSave(form) {
        form.preventDefault();

        let errorsList = {};

        !name ? errorsList.name = "El nombre es obligatorio"
            : '';

        !description ? errorsList.description = "La descripcion es obligatoria"
            : '';

        !price ? errorsList.price = "El precio es obligatorio"
            : '';

        !category ? errorsList.category = "La categoria es obligatoria"
            : '';


        addProduct({
            name,
            description,
            price,
            category,
        })
            .then((result) => {
                console.log(result);

                if (!result.success) {
                    alert(result.message);
                    setErrors({ ...result.errors });
                } else {
                    alert(result.message);
                    setName('');
                    setDescription('');
                    setPrice('');
                    setCategory('');
                    window.location.href = '/products';
                }

            })
            .catch((error) => {
                alert(error.message);
            });

    }

    return (
        
        <div className="max-w-md mx-auto mt-2 p-4 bg-white shadow-md rounded-md container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div className="flex mb-2 justify-end">
                    <button
                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
                    >
                        <a href="/products">Volver</a>
                    </button>
                    
                </div>

            <h2 className="text-2xl text-center font-bold text-black mb-4">Agregar Nuevo Producto</h2>
            <form method="POST" onSubmit={onSave}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-600">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="w-full mt-1 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors({
                                ...errors,
                                name: undefined,
                            });
                        }}
                    />
                    <p className="text-red-600">{errors.name || ''}</p>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-gray-600">
                        Descripción del Producto
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full mt-1 p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows="4"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setErrors({
                                ...errors,
                                description: undefined,
                            });
                        }}
                    ></textarea>
                    <p className="text-red-600">{errors.description || ''}</p>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-sm font-semibold text-gray-600">
                        Precio del Producto
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="w-full mt-1 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                            setErrors({
                                ...errors,
                                price: undefined,
                            });
                        }}
                    />
                    <p className="text-red-600">{errors.price || ''}</p>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="category"
                        className="block text-sm font-semibold text-gray-600">
                        Categoría del Producto
                    </label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="w-full mt-1 p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setErrors({
                                ...errors,
                                category: undefined,
                            });
                        }}
                    />
                    <p className="text-red-600">{errors.category || ''}</p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white p-3 rounded-md hover:bg-green-600 hover:text-black transition duration-300"
                >
                    Agregar Producto
                </button>
            </form>
        </div>
    )
}