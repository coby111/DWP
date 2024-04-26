"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


function supabaseClient() {
    //crear cliente supabase
    const cookieStore = cookies();
    return createClient(cookieStore);

}


    

export async function getProducts() {
    const supabase = supabaseClient();
    const { data: products, error } = await supabase
    .from('products')
    .select();

    return {
        products,
        error
    };
}

export async function searchProducts(params) {
    const supabase = supabaseClient();
    
    let { data: products, error } = await supabase.from('products').select();

    if (params) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(params.toLowerCase())
        );
    }

    return {
        products,
        error,
    };
}