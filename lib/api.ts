import { Todo } from "@/types/todo";


const API_URL = process.env.NEXT_PUBLIC_API_URL;



export async function getTodos(): Promise<Todo[]> {

    const response = await fetch(
        `${API_URL}/todos`
    );

    return response.json();

}





export async function createTodo(title:string){

    const response = await fetch(
        `${API_URL}/todos`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                title
            })
        }
    );


    return response.json();

}





export async function updateTodo(
    id:number
){

    const response = await fetch(
        `${API_URL}/todos/${id}`,
        {
            method:"PUT"
        }
    );


    return response.json();

}





export async function deleteTodo(
    id:number
){

    await fetch(
        `${API_URL}/todos/${id}`,
        {
            method:"DELETE"
        }
    );

}





export async function editTodo(
    id:number,
    title:string
){

    const response = await fetch(
        `${API_URL}/todos/edit/${id}`,
        {
            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                title
            })
        }
    );


    return response.json();

}