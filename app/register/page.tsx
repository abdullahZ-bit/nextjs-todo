"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL;



export default function RegisterPage() {


    const router = useRouter();


    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);





    async function handleRegister(
        e: React.FormEvent
    ) {


        e.preventDefault();


        setLoading(true);

        setError("");



        try {


            const response = await fetch(

                `${API_URL}/auth/register`,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    body:JSON.stringify({

                        username,

                        email,

                        password

                    })

                }

            );



            if(!response.ok){

                const data = await response.json();

                throw new Error(
                    data.detail || "Registration failed"
                );

            }



            router.push("/login");


        }


        catch(err:any){

            setError(err.message);

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

                            Create Account

                        </h1>



                        <p className="mt-3 text-slate-500">

                            Start organizing your work like a developer.

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

                        onSubmit={handleRegister}

                        className="space-y-5"

                    >




                        <div>


                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Username

                            </label>



                            <input

                                type="text"

                                placeholder="Abdullah"

                                value={username}

                                onChange={(e)=>
                                    setUsername(e.target.value)
                                }


                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"


                                required

                            />


                        </div>








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

                                "Creating Account..."

                                :

                                "Create Account"

                            }


                        </button>





                    </form>







                    <p className="mt-6 text-center text-sm text-slate-500">


                        Already have an account?


                        <button

                            onClick={() =>
                                router.push("/login")
                            }

                            className="ml-2 font-semibold text-blue-600 hover:text-blue-800"


                        >

                            Login

                        </button>


                    </p>





                </div>


            </div>


        </main>


    );

}