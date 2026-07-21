from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas

from dependencies import get_db, get_current_user



router = APIRouter(
    prefix="/todos",
    tags=["Todos"]
)



# ==========================
# GET USER TODOS
# ==========================

@router.get("/", response_model=list[schemas.TodoResponse])
def get_todos(

    db: Session = Depends(get_db),

    current_user: models.User = Depends(get_current_user)

):

    todos = db.query(models.Todo).filter(

        models.Todo.user_id == current_user.id

    ).all()


    return todos





# ==========================
# CREATE TODO
# ==========================

@router.post("/", response_model=schemas.TodoResponse)
def create_todo(

    todo: schemas.TodoCreate,

    db: Session = Depends(get_db),

    current_user: models.User = Depends(get_current_user)

):


    new_todo = models.Todo(

        title=todo.title,

        user_id=current_user.id

    )


    db.add(new_todo)

    db.commit()

    db.refresh(new_todo)


    return new_todo





# ==========================
# TOGGLE COMPLETE
# ==========================

@router.put("/{todo_id}", response_model=schemas.TodoResponse)
def complete_todo(

    todo_id: int,

    db: Session = Depends(get_db),

    current_user: models.User = Depends(get_current_user)

):


    todo = db.query(models.Todo).filter(

        models.Todo.id == todo_id,

        models.Todo.user_id == current_user.id

    ).first()



    if not todo:

        raise HTTPException(

            status_code=404,

            detail="Todo not found"

        )



    todo.completed = not todo.completed


    db.commit()

    db.refresh(todo)


    return todo





# ==========================
# DELETE TODO
# ==========================

@router.delete("/{todo_id}")
def delete_todo(

    todo_id: int,

    db: Session = Depends(get_db),

    current_user: models.User = Depends(get_current_user)

):


    todo = db.query(models.Todo).filter(

        models.Todo.id == todo_id,

        models.Todo.user_id == current_user.id

    ).first()



    if not todo:

        raise HTTPException(

            status_code=404,

            detail="Todo not found"

        )



    db.delete(todo)

    db.commit()



    return {

        "message": "Todo deleted successfully"

    }





# ==========================
# EDIT TODO
# ==========================

@router.put("/edit/{todo_id}", response_model=schemas.TodoResponse)
def edit_todo(

    todo_id: int,

    todo_update: schemas.TodoUpdate,

    db: Session = Depends(get_db),

    current_user: models.User = Depends(get_current_user)

):


    todo = db.query(models.Todo).filter(

        models.Todo.id == todo_id,

        models.Todo.user_id == current_user.id

    ).first()



    if not todo:

        raise HTTPException(

            status_code=404,

            detail="Todo not found"

        )



    if todo_update.title is not None:

        todo.title = todo_update.title



    if todo_update.completed is not None:

        todo.completed = todo_update.completed



    db.commit()

    db.refresh(todo)



    return todo