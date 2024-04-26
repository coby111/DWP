'use client'
import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from './actions.js';
import Link from 'next/link.js';

const EditProductPage = ({ params }) => {
    const id = params.id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setProduct(product);
                setUpdatedProduct(product);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validation = validateProduct(updatedProduct);
            if (!validation.success) {
                setErrors(validation.errors);
                return;
            }
            await updateProduct(updatedProduct);
            alert("Producto editado correctamente");
            window.location.href = "/products";
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const validateProduct = (updatedProduct) => {
        const errorsList = {};

        if (!updatedProduct.name) {
            errorsList.name = "El nombre es obligatorio";
        }
    
        if (!updatedProduct.description) {
            errorsList.description = "La descripción es obligatoria";
        }
    
        if (!updatedProduct.price) {
            errorsList.price = "El precio es obligatorio";
        } else if (!/^[0-9]+([\\.,][0-9]+)?$/.test(updatedProduct.price)) {
            errorsList.price = "El precio debe ser un número";
        }
    
        if (!updatedProduct.category) {
            errorsList.category = "La categoría es obligatoria";
        }

        return {
            success: Object.keys(errorsList).length === 0,
            errors: errorsList,
        };
    };
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div
            className='h-full'>
            <div className="mt-4 justify-center w-full max-w-lg">
                <div className='mt-5px'>
                    <h1
                        className='text-3xl text-center font-bold text-green-200 mb-4'>
                        Editar Producto {updatedProduct.name}
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div
                        className='mb-4'>
                        <input
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleInputChange} />
                    </div>
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                    <div
                        className='mb-4'>
                        <textarea
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            type="text"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange} />
                    </div>
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                    <div
                        className='mb-4'>
                        <input
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            type="number"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange} />
                    </div>
                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                    <div
                        className='mb-4'>
                        <input
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            type="text"
                            name="category"
                            value={updatedProduct.category}
                            onChange={handleInputChange} />
                    </div>
                    {errors.category && <p className="text-red-500">{errors.category}</p>}
                    <div className="flex justify-center">
                        <button
                            className="ml-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none"
                        >
                            Guardar
                        </button>
                        <Link
                            href="/products"
                            className="ml-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default EditProductPage;