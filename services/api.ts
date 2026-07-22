const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";



// ==========================
// GET TOKEN
// ==========================

function getToken(){

    if(typeof window === "undefined"){
        return null;
    }


    return localStorage.getItem("token");

}





// ==========================
// AUTH HEADERS
// ==========================

function authHeaders(){


    const token = getToken();


    return {

        "Content-Type":"application/json",

        "Authorization": `Bearer ${token}`

    };

}





// ==========================
// GET TODOS
// ==========================

export async function getTodos(){


    const response = await fetch(

        `${API_URL}/todos/`,

        {
            headers: authHeaders()
        }

    );


    if(!response.ok){

        throw new Error(
            "Failed to fetch todos"
        );

    }


    return response.json();

}





// ==========================
// CREATE TODO
// ==========================

export async function createTodo(
    title:string
){


    const response = await fetch(

        `${API_URL}/todos/`,

        {

            method:"POST",

            headers:authHeaders(),

            body:JSON.stringify({

                title

            })

        }

    );


    if(!response.ok){

        throw new Error(
            "Failed to create todo"
        );

    }


    return response.json();

}





// ==========================
// TOGGLE TODO COMPLETE
// ==========================

export async function updateTodo(

    id:number

){


    const response = await fetch(

        `${API_URL}/todos/${id}`,

        {

            method:"PUT",

            headers:authHeaders()

        }

    );


    if(!response.ok){

        throw new Error(
            "Failed to update todo"
        );

    }


    return response.json();

}





// ==========================
// EDIT TODO
// ==========================

export async function editTodo(

    id:number,

    title:string

){


    const response = await fetch(

        `${API_URL}/todos/edit/${id}`,

        {

            method:"PUT",

            headers:authHeaders(),

            body:JSON.stringify({

                title

            })

        }

    );


    if(!response.ok){

        throw new Error(
            "Failed to edit todo"
        );

    }


    return response.json();

}





// ==========================
// DELETE TODO
// ==========================

export async function deleteTodo(

    id:number

){


    const response = await fetch(

        `${API_URL}/todos/${id}`,

        {

            method:"DELETE",

            headers:authHeaders()

        }

    );


    if(!response.ok){

        throw new Error(
            "Failed to delete todo"
        );

    }


    return response.json();

}





// ==========================
// GET CURRENT USER
// ==========================

export async function getCurrentUser(){


    const response = await fetch(

        `${API_URL}/auth/me`,

        {

            headers:authHeaders()

        }

    );



    if(!response.ok){

        throw new Error(
            "Unable to fetch current user"
        );

    }



    return response.json();

}