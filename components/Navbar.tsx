"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";




type NavbarProps = {
  title:string;
};


export default function Navbar({title}:NavbarProps){


const router = useRouter();



const [user,setUser]=useState<any>(null);





useEffect(()=>{


async function loadUser(){


try{


const data = await getCurrentUser();


setUser(data);



}

catch(error){


console.log(error);


}


}



loadUser();



},[]);







function logout(){


localStorage.removeItem("token");


router.push("/login");


}







return (

<nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">


<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">



{/* Logo */}

<div className="flex items-center gap-3">


<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">

{"</>"}

</div>



<div>

<h1 className="text-xl font-bold text-slate-900">

{title}

</h1>


<p className="text-sm text-slate-500">

Developer Workspace

</p>


</div>


</div>






{/* Right Side */}

<div className="flex items-center gap-4">



<div className="hidden md:block text-right">


<p className="font-semibold text-slate-900">

{user?.username || "User"}

</p>


<p className="text-sm text-slate-500">

{user?.email}

</p>


</div>





<div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">


<div className="h-2 w-2 rounded-full bg-emerald-500"></div>


<span className="text-sm text-emerald-700">

Online

</span>


</div>





<button

onClick={logout}

className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-100"

>

Logout

</button>




</div>





</div>


</nav>


);


}
