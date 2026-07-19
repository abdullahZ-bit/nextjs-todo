"use client";

import { useEffect, useState } from "react";

import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Navbar from "@/components/Navbar";

import { Todo } from "@/types/todo";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  editTodo
} from "@/lib/api";



export default function Home() {


  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");





  // Load Todos

  useEffect(() => {


    async function loadTodos() {

      try {

        const data = await getTodos();

        setTodos(data);

      }

      catch(error){

        setError(
          "Unable to connect with backend"
        );

      }

      finally {

        setLoading(false);

      }

    }


    loadTodos();


  }, []);







  // Add Todo

  const addTodo = async (title:string) => {


    try {


      const newTodo = await createTodo(title);



      setTodos(prev => [

        ...prev,

        newTodo

      ]);


    }

    catch(error){

      setError(
        "Failed to create todo"
      );

    }


  };








  // Toggle Complete

  const toggleTodo = async (id:number) => {


    try {


      const updatedTodo = await updateTodo(id);



      setTodos(prev =>

        prev.map(todo =>

          todo.id === id

          ?

          updatedTodo

          :

          todo

        )

      );


    }

    catch(error){

      setError(
        "Failed to update todo"
      );

    }


  };








  // Delete Todo

  const removeTodo = async (id:number) => {


    try {


      await deleteTodo(id);



      setTodos(prev =>

        prev.filter(todo =>

          todo.id !== id

        )

      );


    }

    catch(error){

      setError(
        "Failed to delete todo"
      );

    }


  };








  // Edit Todo

  const changeTodo = async (

    id:number,

    title:string

  ) => {


    try {


      const updatedTodo = await editTodo(

        id,

        title

      );



      setTodos(prev =>

        prev.map(todo =>

          todo.id === id

          ?

          updatedTodo

          :

          todo

        )

      );


    }

    catch(error){

      setError(
        "Failed to edit todo"
      );

    }


  };








  return (

    <main className="min-h-screen bg-slate-100">


      <Navbar title="Abdullah's Workspace" />



      <section className="mx-auto max-w-3xl px-6 py-12">



        <div className="mb-10">


          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">

            Build. Focus. Ship.

          </h1>



          <p className="mt-3 text-lg text-slate-600">

            Organize today's work like a developer.

          </p>


        </div>





        {
          error && (

            <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">

              {error}

            </div>

          )
        }







        <div className="grid grid-cols-3 gap-4 mb-8">



          <div className="rounded-xl bg-white shadow p-5 border">

            <p className="text-sm text-slate-500">
              Total
            </p>


            <h2 className="text-3xl font-bold">

              {todos.length}

            </h2>


          </div>






          <div className="rounded-xl bg-white shadow p-5 border">


            <p className="text-sm text-slate-500">
              Completed
            </p>


            <h2 className="text-3xl font-bold text-emerald-600">


              {
                todos.filter(
                  todo => todo.completed
                ).length
              }


            </h2>


          </div>






          <div className="rounded-xl bg-white shadow p-5 border">


            <p className="text-sm text-slate-500">
              Remaining
            </p>


            <h2 className="text-3xl font-bold text-blue-600">


              {
                todos.filter(
                  todo => !todo.completed
                ).length
              }


            </h2>


          </div>


        </div>








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