from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base



# ==========================
# USER MODEL
# ==========================


class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    username = Column(
        String(50),
        nullable=False
    )


    email = Column(
        String(100),
        unique=True,
        index=True,
        nullable=False
    )


    password = Column(
        String,
        nullable=False
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    # One User -> Many Todos
    todos = relationship(
        "Todo",
        back_populates="owner",
        cascade="all, delete"
    )


    def __repr__(self):
        return f"<User {self.email}>"





# ==========================
# TODO MODEL
# ==========================


class Todo(Base):

    __tablename__ = "todos"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    title = Column(
        String(200),
        nullable=False
    )


    completed = Column(
        Boolean,
        default=False,
        nullable=False
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    # Foreign Key
    # Every Todo belongs to one User
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    # Many Todos -> One User
    owner = relationship(
        "User",
        back_populates="todos"
    )


    def __repr__(self):
        return f"<Todo {self.title}>"