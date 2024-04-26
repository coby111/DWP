
"use client"

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from "react";
import { changePassword } from "./actions"
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';


export default function AddProduct() {

    const router = useRouter();
    const supabase = createClient()

    const [password, setPass] = useState('');
    const [conPassword, setConPas] = useState('');

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getData = async () => {

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            }
        }
        getData()
    }, [])


    function onSave(form) {
        //evitar el submit
        form.preventDefault();

        //validacion de datos
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

        setErrors({ ...errorList });
        //si hay mensajes de error, interrumpir el flujo
        if (Object.keys(errorList).length > 0) {
            return;
        }

        // alert("se guardan los datos");

        changePassword(
            password, conPassword

        )
            .then((result) => {
                //cuando la accion se ejecute correctamente
                // y retorne una respuesta
                console.log(result);

                //hacer algo con el resultado
                if (!result.success) {
                    //hay errores
                    alert(result.message);
                    // mostrar los mensajes de error
                    setErrors({ ...result.errors });
                } else {
                    //Si se guardó
                    router.push('/login');
                    setPass('');
                    setConPas('');

                    //limpiar errores
                    //setErrores({})
                }
            })
            .catch((error) => {
                alert(error.message);
            })


    }

    return (

        <div className="mt-8 bg-white rounded-lg shadow-lg px-6 py-6 grid justify-items-center font-serif text-black" onSubmit={onSave}>
    <p className="text-black font-bold text-3xl italic font-serif mb-4">Cambiar contraseña</p>
    <form method="POST">

        <div className="mb-3 flex flex-col border-b-2 border-gray-300 pb-2">
            <label htmlFor="password" className="text-black py-1">Contraseña nueva</label>

            <input type="password" name="password"
                className="border rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => {
                    setPass(e.target.value);
                    setErrors({
                        ...errors,
                        password: undefined,
                    });
                }} />
            <p className="text-red-600">{errors.password || ""}</p>
        </div>

        <div className="mb-2 flex flex-col border-b-2 border-gray-300 pb-2">
            <label htmlFor="conPassword" className="text-black py-1">Confirmar Contraseña</label>

            <input type="password" name="conPassword"
                className="border rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                value={conPassword}
                onChange={(e) => {
                    setConPas(e.target.value);
                    setErrors({
                        ...errors,
                        conPassword: undefined,
                    });
                }} />
            <p className="text-red-600">{errors.conPassword || ""}</p>
        </div>

        <div className="my-6 flex justify-center">
            <button type="submit"
                className="bg-green-500 rounded-md text-black font-bold font-serif px-4 py-2 mx-2 grid justify-items-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                Cambiar contraseña
            </button>
            <button
                className="bg-red-500 rounded-md text-black font-bold font-serif px-4 py-2 mx-2 grid justify-items-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500" onClick={() => window.location.href = "./"}>
                Cancelar
            </button>
        </div>

    </form>
</div>


    )



}