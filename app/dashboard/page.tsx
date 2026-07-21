"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";

import { Todo } from "@/types/todo";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  editTodo,
  getDashboardStats
} from "@/lib/api";



export default function DashboardPage() {


  const router = useRouter();



  const [todos, setTodos] = useState<Todo[]>([]);



  const [stats, setStats] = useState({

    total_users:0,

    my_todos:0,

    completed:0,

    pending:0,

    completion_rate:0,

    created_today:0

  });



  const [loading,setLoading] = useState(true);


  const [checkingAuth,setCheckingAuth] = useState(true);


  const [error,setError] = useState("");






  // ==========================
  // LOAD DASHBOARD
  // ==========================

  async function loadDashboard(){


    try{


      const todoData = await getTodos();


      setTodos(todoData);




      const statsData = await getDashboardStats();


      setStats(statsData);



    }


    catch(error){


      setError(
        "Unable to load dashboard"
      );


    }


    finally{


      setLoading(false);


      setCheckingAuth(false);


    }


  }








  // ==========================
  // AUTH CHECK
  // ==========================

  useEffect(()=>{


    const token = localStorage.getItem("token");



    if(!token){

      router.push("/login");

      return;

    }



    loadDashboard();



  },[]);









  // ==========================
  // ADD TODO
  // ==========================

  async function addTodo(title:string){


    try{


      const newTodo = await createTodo(title);



      setTodos(prev=>[

        ...prev,

        newTodo

      ]);



      loadDashboard();



    }

    catch{


      setError(
        "Failed to create todo"
      );


    }


  }









  // ==========================
  // TOGGLE TODO
  // ==========================

  async function toggleTodo(id:number){


    try{


      const updatedTodo = await updateTodo(id);



      setTodos(prev=>


        prev.map(todo=>


          todo.id === id

          ?

          updatedTodo

          :

          todo


        )

      );



      loadDashboard();



    }

    catch{


      setError(
        "Failed to update todo"
      );


    }


  }









  // ==========================
  // DELETE TODO
  // ==========================

  async function removeTodo(id:number){


    try{


      await deleteTodo(id);



      setTodos(prev=>


        prev.filter(todo=>


          todo.id !== id


        )

      );



      loadDashboard();



    }

    catch{


      setError(
        "Failed to delete todo"
      );


    }


  }









  // ==========================
  // EDIT TODO
  // ==========================

  async function changeTodo(

    id:number,

    title:string

  ){


    try{


      const updatedTodo = await editTodo(

        id,

        title

      );




      setTodos(prev=>


        prev.map(todo=>


          todo.id === id

          ?

          updatedTodo

          :

          todo


        )

      );



      loadDashboard();



    }

    catch{


      setError(
        "Failed to edit todo"
      );


    }


  }









  // ==========================
  // AUTH LOADING
  // ==========================


  if(checkingAuth){


    return (

      <main className="min-h-screen flex items-center justify-center bg-slate-100">


        <p className="text-lg text-slate-600">

          Checking authentication...

        </p>


      </main>

    );


  }









  return (


    <main className="min-h-screen bg-slate-100">



      <Navbar title="Todo Dashboard"/>







      <section className="mx-auto max-w-7xl px-6 py-12">





        <div className="mb-10">


          <h1 className="text-5xl font-extrabold text-slate-900">

            Build. Focus. Ship.

          </h1>




          <p className="mt-3 text-lg text-slate-600">

            Manage your tasks and track productivity.

          </p>


        </div>









        {
          error && (


            <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">

              {error}

            </div>


          )
        }









        {/* DASHBOARD CARDS */}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-10">





          <DashboardCard

            title="Total Users"

            value={stats.total_users}

            description="Registered users"

            icon="👥"

          />






          <DashboardCard

            title="My Todos"

            value={stats.my_todos}

            description="Created tasks"

            icon="📝"

          />







          <DashboardCard

            title="Completed"

            value={stats.completed}

            description="Finished tasks"

            icon="✅"

          />







          <DashboardCard

            title="Pending"

            value={stats.pending}

            description="Remaining tasks"

            icon="⏳"

          />








          <DashboardCard

            title="Completion"

            value={stats.completion_rate}

            description="Productivity %"

            icon="📈"

          />








          <DashboardCard

            title="Today"

            value={stats.created_today}

            description="New tasks"

            icon="🔥"

          />




        </div>









        {/* TODO SECTION */}


        <div className="rounded-2xl bg-white shadow-xl border p-8">





          <TodoForm

            addTodo={addTodo}

          />








          <div className="mt-8">



            <h2 className="mb-4 text-xl font-semibold text-slate-800">

              Today's Tasks

            </h2>







            {

              loading


              ?


              <p>

                Loading tasks...

              </p>




              :





              <TodoList


                todos={todos}


                toggleTodo={toggleTodo}


                deleteTodo={removeTodo}


                editTodo={changeTodo}


              />


            }





          </div>







        </div>







      </section>







    </main>


  );


}