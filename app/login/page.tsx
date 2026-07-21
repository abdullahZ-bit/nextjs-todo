"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL;



export default function LoginPage() {


    const router = useRouter();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);





    async function handleLogin(
        e: React.FormEvent
    ) {


        e.preventDefault();


        setLoading(true);

        setError("");



        try {


            const formData = new URLSearchParams();


            formData.append(
                "username",
                email
            );


            formData.append(
                "password",
                password
            );



            const response = await fetch(

                `${API_URL}/auth/login`,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/x-www-form-urlencoded"

                    },

                    body:formData.toString()

                }

            );



            if(!response.ok){

                throw new Error(
                    "Invalid email or password"
                );

            }



            const data = await response.json();



            localStorage.setItem(

                "token",

                data.access_token

            );



           router.push("/dashboard");



        }

        catch(err:any){

            setError(
                err.message
            );

        }

        finally{

            setLoading(false);

        }


    }







    return (


        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-blue-100 px-6">



            <div className="w-full max-w-md">


                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">





                    {/* Header */}

                    <div className="text-center mb-8">


                        <h1 className="text-4xl font-extrabold text-slate-900">

                            Welcome Back

                        </h1>



                        <p className="mt-3 text-slate-500">

                            Login to continue managing your tasks.

                        </p>


                    </div>







                    {
                        error && (

                            <div className="mb-5 rounded-lg bg-red-100 border border-red-200 p-3 text-red-700 text-sm">

                                {error}

                            </div>

                        )
                    }








                    <form

                        onSubmit={handleLogin}

                        className="space-y-5"

                    >





                        <div>


                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Email

                            </label>



                            <input


                                type="email"


                                placeholder="abdullah@gmail.com"


                                value={email}


                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }



                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"



                                required


                            />


                        </div>









                        <div>


                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Password

                            </label>



                            <input


                                type="password"


                                placeholder="••••••••"


                                value={password}


                                onChange={(e)=>
                                    setPassword(e.target.value)
                                }



                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"



                                required


                            />


                        </div>









                        <button


                            type="submit"


                            disabled={loading}



                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 text-white font-semibold shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"



                        >


                            {

                                loading

                                ?

                                "Logging in..."

                                :

                                "Login"

                            }



                        </button>





                    </form>









                    <p className="mt-6 text-center text-sm text-slate-500">


                        Don't have an account?


                        <button


                            onClick={() =>
                                router.push("/register")
                            }



                            className="ml-2 font-semibold text-blue-600 hover:text-blue-800"


                        >

                            Create Account

                        </button>


                    </p>







                </div>


            </div>


        </main>


    );

}