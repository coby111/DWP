"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Función para registrar un nuevo producto
 * @param {*} product datos del producto
 */
export async function addProduct(product) {

    let errorsList = {};

    !product.name ? errorsList.name = "El nombre es obligatorio"
    : '';

    !product.description ? errorsList.description = "La descripcion es obligatoria"
    : '';

    !product.price ? errorsList.price = "El precio es obligatorio"
    : !product.price.match("^[0-9]+([\\.,][0-9]+)?$") ? errorsList.price = "El precio debe de ser un número"
    : '';

    !product.category ? errorsList.category = "La categoria es obligatoria"
    : '';

    if (Object.keys(errorsList).length > 0) {
        return {
            success: false,
            message: 'Ingresar los datos correctamente',
            errors: errorsList,
        };
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('products')
        .insert([
            product,
        ])
        .select();

    if (error) {
        console.log
        return {
            success: false,
            message: `Ocurrió un error al guardar el producto. 
                Error: ${error.message}`,
            errors: null,
        };
    }

    return {
        success: true,
        message: 'El producto se ha registrado correctamente',
        errors: null,
    };
}