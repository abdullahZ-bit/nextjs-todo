"use client";

import { useState } from "react";

type TodoFormProps = {
  addTodo: (title: string) => Promise<void>;
};


export default function TodoForm({ addTodo }: TodoFormProps) {

  const [todo, setTodo] = useState("");


  const handleSubmit = async () => {

    if (!todo.trim()) return;

    await addTodo(todo);

    setTodo("");

  };


  return (
    <div className="flex items-center gap-4">

      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {

          if (e.key === "Enter") {
            handleSubmit();
          }

        }}
        placeholder="What are you building today?"
        className="
          flex-1
          rounded-2xl
          border
          border-slate-300
          bg-slate-50
          px-5
          py-3.5
          text-base
          text-slate-800
          placeholder:text-slate-400
          shadow-sm
          transition-all
          duration-200
          focus:border-blue-500
          focus:bg-white
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
        "
      />


      <button
        onClick={handleSubmit}
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-slate-900
          px-6
          py-3.5
          font-medium
          text-white
          shadow-lg
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-slate-800
          active:translate-y-0
        "
      >

        <span className="text-lg">
          ＋
        </span>

        Add Task

      </button>


    </div>
  );
}