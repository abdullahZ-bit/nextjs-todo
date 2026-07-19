"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  editTodo: (id: number, title: string) => Promise<void>;
};

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoListProps) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

const saveEdit = async (id: number) => {

  if (!editText.trim()) return;


  await editTodo(id, editText);


  setEditId(null);
  setEditText("");


  };

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No tasks yet 👨‍💻
        </h3>

        <p className="mt-2 text-slate-500">
          Add your first task and start building.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          {/* Left Side */}
          <div className="flex flex-1 items-center gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="h-5 w-5 cursor-pointer accent-blue-600"
            />

            {editId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-slate-50
                  px-4
                  py-2
                  text-slate-800
                  focus:border-blue-500
                  focus:bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-200
                "
              />
            ) : (
              <div className="flex flex-col">
                <span
                  className={`text-lg font-medium ${
                    todo.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-800"
                  }`}
                >
                  {todo.title}
                </span>

                <span
                  className={`mt-1 w-fit rounded-full px-2 py-1 text-xs font-medium ${
                    todo.completed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {todo.completed ? "Completed" : "In Progress"}
                </span>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="ml-4 flex items-center gap-2">
            {editId === todo.id ? (
              <button
                onClick={() => saveEdit(todo.id)}
                className="
                  rounded-xl
                  bg-emerald-600
                  px-4
                  py-2
                  font-medium
                  text-white
                  transition
                  hover:bg-emerald-700
                "
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEdit(todo)}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-2
                  transition
                  hover:bg-slate-100
                "
              >
                ✏️
              </button>
            )}

            <button
              onClick={() => deleteTodo(todo.id)}
              className="
                rounded-xl
                bg-rose-500
                px-4
                py-2
                text-white
                transition
                hover:bg-rose-600
              "
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}