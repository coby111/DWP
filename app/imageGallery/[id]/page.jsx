'use client'

import { useEffect, useState } from 'react';
import { getProductByIdGallery, getProducts } from './actions';
import Slider from "../../../components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function Page({ params }) {

    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const loadProduct = async () => {
            const productResult = await getProductByIdGallery(params.id || 10);
            setProduct(productResult.product);
            console.log(productResult)
            if (productResult.error) {
                alert(productResult.error.message);
            }
        };
        loadProduct()
    }, []);


    useEffect(() => {
        const getData = async () => {
            try {
                const productsResult = await getProducts();
                setProducts(productsResult.products);
                console.log(productsResult)
                if (productsResult.error) {
                    alert(productsResult.error.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        getData();
    }, []);


    const productsWithImages = products.filter(product => product.gallery && product.gallery.length > 0);

    // Mapea todas las imágenes de todos los productos para mostrarlas en el slider
    const imageCards = productsWithImages.flatMap(product => (
        product.gallery.map((image, index) => (
            <div key={`${product.id}-${index}`} className="p-4 bg-slate-700 border border-1">
                <img className='w-[120px] h-[90px]' src={image.original} alt={`Product Image ${index}`} />
            </div>
        ))
    ));

    return (
        <div className="my-2 h-full py-4 mt-2">
            <div className="flex justify-between items-center mb-2 mt-7 w-full h-full">
                <div className="flex items-center">
                    <div className="mr-10">
                        <a href="/products" className="text-xl font-bold">
                            <FontAwesomeIcon icon={faArrowLeft} href='/products'></FontAwesomeIcon>
                        </a>
                    </div>
                </div>
                <h1 className="flex-grow text-center text-7xl text-yellow-400 mb-1">Detalles del producto</h1>
            </div>
            <div
                className="flex flex-col md:flex-row items-start md:items-center">
                <div
                    className="px-2 pb-5 md:w-1/2 text-left border">
                    <p
                        className="mb-3 mt-8 ml-16 mr-16 text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                        {product.name}
                    </p>
                    <p
                        className="mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-400">
                        {product.description}
                    </p>
                    <p
                        className="font-bold text-red-500 text-2xl text-end">
                        ${product.price}
                    </p>
                </div>
                {!!product && (
                    <div className="max-w-[500px] mt-6 md:w-1/2 ml-20">
                        {product.gallery && product.gallery.length > 0 ? (
                            <ImageGallery items={product.gallery} />
                        ) : (
                            <p>No hay imágenes disponibles</p>
                        )}
                    </div>
                )}
            </div>
            <div className="py-14 px-4 w-full">
                <h1>Productos relacionados</h1>
                <Slider
                    className={'select-none'}
                    height={120}
                    itemWidth={150}
                    items={imageCards}
                />
            </div>
        </div>

    );

}