"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function supabaseClient(){
        const cookieStore = cookies();
        return createClient(cookieStore)
        
}


export async function getProductById(id) {
    const supabase = supabaseClient();
    const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
    if (error) {
        throw new Error('Error fetching product by ID');
    }

    return product;
}

export async function updateProduct(updatedProduct) {
    // Realiza la validación de datos
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
        errorsList.price = "El precio debe ser un número válido";
    }

    if (!updatedProduct.category) {
        errorsList.category = "La categoría es obligatoria";
    }

    // Si hay errores, devuelve un objeto con el indicador de éxito en false y la lista de errores
    if (Object.keys(errorsList).length > 0) {
        return {
            success: false,
            message: 'Ingresar los datos correctamente',
            errors: errorsList,
        };
    }

    // Si no hay errores, actualiza el producto en la base de datos
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', updatedProduct.id);

    // Si hay un error al actualizar el producto, lanza una excepción
    if (error) {
        throw new Error('Error updating product');
    }

    // Devuelve los datos actualizados del producto
    return data;
}