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



export async function getProductByIdGallery(id) {
    const supabase = supabaseClient();
    const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
    if (error) {
        throw new Error('Error al obtener el producto por su ID');
    }

    return {product};
}