from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from dependencies import get_current_user

from sqlalchemy.orm import Session

import models
import schemas

from database import SessionLocal

from security import (
    hash_password,
    verify_password,
    create_access_token
)

from dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



# -----------------------------
# Database Dependency
# -----------------------------

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()





# -----------------------------
# Register User
# -----------------------------

@router.post(
    "/register",
    response_model=schemas.UserResponse
)
def register(

    user: schemas.UserCreate,

    db: Session = Depends(get_db)

):


    # Check existing user

    existing_user = db.query(models.User).filter(

        models.User.email == user.email

    ).first()



    if existing_user:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="Email already registered"

        )



    # Hash password

    hashed_password = hash_password(
        user.password
    )



    # Create user

    new_user = models.User(

        username=user.username,

        email=user.email,

        password=hashed_password

    )



    db.add(new_user)

    db.commit()

    db.refresh(new_user)



    return new_user





# -----------------------------
# Login User (Swagger OAuth2)
# -----------------------------

@router.post(
    "/login",
    response_model=schemas.TokenResponse
)
def login(

    form_data: OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)

):


    # Swagger sends username field
    # We use email as username

    user = db.query(models.User).filter(

        models.User.email == form_data.username

    ).first()



    if not user:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid email or password"

        )



    if not verify_password(

        form_data.password,

        user.password

    ):


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid email or password"

        )





    # Create JWT token

    token = create_access_token(

        {

            "sub": user.email

        }

    )





    return {


        "message": "Login successful",


        "access_token": token,


        "token_type": "bearer"

    }
# -----------------------------
# Get Current User
# -----------------------------

@router.get(
    "/me",
    response_model=schemas.UserResponse
)
def get_me(

    current_user: models.User = Depends(get_current_user)

):

    return current_user
# -----------------------------
# Get Current User
# -----------------------------

@router.get(
    "/me",
    response_model=schemas.UserResponse
)
def get_me(
    current_user: models.User = Depends(get_current_user)
):

    return current_user

# -----------------------------
# Get Current User
# -----------------------------

@router.get(
    "/me",
    response_model=schemas.UserResponse
)
def get_me(
    current_user: models.User = Depends(get_current_user)
):

    return current_user