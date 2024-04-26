'use client'
import React, { useEffect, useState } from 'react';
import Slider from "../../components/Slider";
import { getProducts } from "./actions";

export default function SliderPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const productsResult = await getProducts();
                setProducts(productsResult.products);
                console.log(products)
                if (productsResult.error) {
                    alert(productsResult.error.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        getData();
    }, []);

    // Filtra los productos que tienen imágenes en su galería
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
        <div className="py-14 px-4 w-full">
            <h1>Ejemplo del slider</h1>
            <Slider
                height={120}
                itemWidth={150}
                items={imageCards}
            />
        </div>
    );
}