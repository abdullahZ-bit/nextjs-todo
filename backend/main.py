from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from database import engine

import models

from auth import router as auth_router

from routers import todo, dashboard
from routers import dashboard





# Create database tables

models.Base.metadata.create_all(bind=engine)



app = FastAPI()





# ==========================
# CORS
# ==========================


from fastapi.middleware.cors import CORSMiddleware


from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "https://nextjs-todo-three-inky.vercel.app",
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)





# ==========================
# ROUTERS
# ==========================


app.include_router(auth_router)

app.include_router(todo.router)
app.include_router(dashboard.router)





# ==========================
# HOME ROUTE
# ==========================


@app.get("/")
def home():

    return {

        "message": "Todo API Running"

    }