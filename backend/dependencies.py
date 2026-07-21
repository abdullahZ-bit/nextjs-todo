from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt

from sqlalchemy.orm import Session


import models

from database import SessionLocal

from security import SECRET_KEY, ALGORITHM





# ==========================
# JWT TOKEN SCHEME
# ==========================


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)





# ==========================
# DATABASE DEPENDENCY
# ==========================


def get_db():

    db = SessionLocal()


    try:

        yield db


    finally:

        db.close()





# ==========================
# GET CURRENT USER
# ==========================


def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):


    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )


        email = payload.get("sub")



        if email is None:

            raise HTTPException(

                status_code=401,

                detail="Invalid token"

            )



    except JWTError:


        raise HTTPException(

            status_code=401,

            detail="Invalid token"

        )





    user = db.query(models.User).filter(

        models.User.email == email

    ).first()





    if user is None:


        raise HTTPException(

            status_code=404,

            detail="User not found"

        )





    return user