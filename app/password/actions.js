"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function changePassword(password, conPassword) {

    let errorList = {};

    if (!password) {
        errorList.password = "La contraseña es obligaroria.";
    } else if (password.length < 6) {
        errorList.password = "La contraseña debe tener al menos 6 carácteres."
    }

    if (!conPassword) {
        errorList.conPassword = "Confirmar contraseña es obligatoria.";
    } else if (password && password != conPassword) {
        errorList.conPassword = "La contraseña y confirmar contraseña no coinciden."
    }

    if (Object.keys(errorList).length > 0) {
        return {
            success: false,
            message: 'Ingresar los datos correctamente.',
            errors: errorList,
        };
    }

    //pasar a guardar la contraseña
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) {
        return {
            success: false,
            message: `No se pudo actualizar la contraseña. ${error.message}`,
            errors: [],
        };
    }

    return {
        success: true,
        message: "La contraseña ha sido actualizada.",
        errors: [],
    }
}