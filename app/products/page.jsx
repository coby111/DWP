    'use client'
import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from './actions.js'
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from "next/navigation";

export default function Page() {
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const supabase = createClient();
    const router = useRouter();


    useEffect(() => {
        const getData = async () => {
            const { data : { session } } = await supabase.auth.getSession();
            if(!session) {
                router.push("/login");
            }

            const productsResult = await getProducts();
            setProducts(productsResult.products);
            if (productsResult.error) {
                alert(productsResult.error.message);
            }
        }
        getData()
    }, []);

    function handleSearch(e) {
        e.preventDefault();

        const getData = async () => {
            const productsResult = await searchProducts(search);
            setProducts(productsResult.products);
            if (productsResult.error) {
                alert(productsResult.error.message);
            }
        }
        getData()
    }


    return (
        <div className="h-full">
            <div className="mt-4 flex justify-center">
                <form
                    className="mb-4"
                    onChange={handleSearch}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-96 bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <div className="flex mb-4 ml-6">
                    <Link
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-400 dark:hover:bg-green-600 dark:focus:ring-green-600"
                        href="/products/add">
                        Agregar Producto
                    </Link>

                </div>
            </div>
            <div className="mt-4 m-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-14">
                {products?.map((product) => (
                    <div className="relative flex flex-col items-center w-full overflow-hidden bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-4">
                        <ul>
                            <li key={product.id}>
                            </li>
                        </ul>
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded-full p-1.5 bg-black"></div>
                            </div>
                            <div className="px-5 pb-5">
                                <p className="text-center mb-3 text-4xl font-semibold text-green-700">
                                    {product.name}
                                </p>
                                <p className="text-justify mb-2 text-2xl font-bold text-gray-900">
                                    {product.description}
                                </p>
                                <p className="mb-2 text-end text-3xl font-bold text-red-500">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                        <div className=" flex mt-4 md:mt-6">
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                <Link
                                    className=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    href={`/products/edit/${product.id}`}>
                                    Editar
                                </Link>
                                <Link
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black bg-red-500 border border-red-300 rounded-lg hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-red-500 dark:text-black dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:focus:ring-red-700 ms-3"
                                    href={`/products/${product.id}`}>
                                    Eliminar
                                </Link>
                                <Link
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-500 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                                    href={`../imageGallery/${product.id}`}>
                                    Ver
                                </Link>
                            </div>
                        </div>
                    </div>
                )

                )}
            </div>
        </div>
    )

}