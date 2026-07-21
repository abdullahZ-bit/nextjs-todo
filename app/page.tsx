"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {


  const router = useRouter();



  useEffect(() => {


    const token = localStorage.getItem("token");



    if(token){

      router.push("/dashboard");

    }

    else{

      router.push("/login");

    }


  }, [router]);





  return (

    <main className="min-h-screen flex items-center justify-center bg-slate-100">

      <p className="text-slate-600">

        Loading...

      </p>


    </main>

  );

}