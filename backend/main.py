from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import SessionLocal, engine
import models
import schemas


# Create database tables
models.Base.metadata.create_all(bind=engine)


app = FastAPI()



# DATABASE CONNECTION

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



# CORS FOR NEXT.JS

app.add_middleware(
    CORSMiddleware,

allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# HOME ROUTE

@app.get("/")
def home():

    return {
        "message": "Todo API Running"
    }




# GET ALL TODOS

@app.get("/todos")
def get_todos(
    db: Session = Depends(get_db)
):

    return db.query(models.Todo).all()




# CREATE TODO

@app.post("/todos")
def create_todo(
    todo: schemas.TodoCreate,
    db: Session = Depends(get_db)
):

    new_todo = models.Todo(
        title=todo.title
    )


    db.add(new_todo)

    db.commit()

    db.refresh(new_todo)


    return new_todo





# TOGGLE COMPLETE

@app.put("/todos/{todo_id}")
def complete_todo(
    todo_id:int,
    db:Session = Depends(get_db)
):

    todo = db.query(models.Todo).filter(
        models.Todo.id == todo_id
    ).first()


    if not todo:
        return {
            "error":"Todo not found"
        }


    todo.completed = not todo.completed


    db.commit()

    db.refresh(todo)


    return todo






# DELETE TODO

@app.delete("/todos/{todo_id}")
def delete_todo(
    todo_id:int,
    db:Session = Depends(get_db)
):

    todo = db.query(models.Todo).filter(
        models.Todo.id == todo_id
    ).first()


    if todo:

        db.delete(todo)

        db.commit()



    return {
        "message":"Todo deleted"
    }





# UPDATE TITLE SCHEMA

class TodoUpdate(BaseModel):

    title:str






# EDIT TODO

@app.put("/todos/edit/{todo_id}")
def edit_todo(
    todo_id:int,
    todo:TodoUpdate,
    db:Session = Depends(get_db)
):

    existing = db.query(models.Todo).filter(
        models.Todo.id == todo_id
    ).first()



    if not existing:

        return {
            "error":"Todo not found"
        }



    existing.title = todo.title


    db.commit()

    db.refresh(existing)


    return existing