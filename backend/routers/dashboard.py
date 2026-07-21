from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date

import models

from dependencies import get_db, get_current_user



router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)





@router.get("/stats")
def dashboard_stats(

    db: Session = Depends(get_db),

    current_user: models.User = Depends(get_current_user)

):


    # ==========================
    # USERS
    # ==========================

    total_users = db.query(
        models.User
    ).count()



    # ==========================
    # USER TODOS
    # ==========================

    total_todos = db.query(
        models.Todo
    ).filter(

        models.Todo.user_id == current_user.id

    ).count()





    completed_todos = db.query(
        models.Todo
    ).filter(

        models.Todo.user_id == current_user.id,

        models.Todo.completed == True

    ).count()





    pending_todos = (
        total_todos - completed_todos
    )





    # ==========================
    # COMPLETION RATE
    # ==========================


    completion_rate = 0


    if total_todos > 0:

        completion_rate = round(

            (completed_todos / total_todos) * 100,

            2

        )






    # ==========================
    # TODAY CREATED TODOS
    # ==========================


    today = date.today()



    today_tasks = db.query(
        models.Todo
    ).filter(

        models.Todo.user_id == current_user.id,

        func.date(models.Todo.created_at) == today

    ).count()







    return {


        "total_users": total_users,


        "my_todos": total_todos,


        "completed": completed_todos,


        "pending": pending_todos,


        "completion_rate": completion_rate,


        "created_today": today_tasks


    }