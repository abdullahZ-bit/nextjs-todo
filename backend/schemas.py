from pydantic import BaseModel, EmailStr, ConfigDict



# ==========================
# TODO SCHEMAS
# ==========================


class TodoCreate(BaseModel):

    title: str





class TodoUpdate(BaseModel):

    title: str | None = None

    completed: bool | None = None





class TodoResponse(BaseModel):

    id: int

    title: str

    completed: bool

    user_id: int


    model_config = ConfigDict(
        from_attributes=True
    )





# ==========================
# USER SCHEMAS
# ==========================


class UserCreate(BaseModel):

    username: str

    email: EmailStr

    password: str





class UserLogin(BaseModel):

    email: EmailStr

    password: str





class UserResponse(BaseModel):

    id: int

    username: str

    email: EmailStr


    model_config = ConfigDict(
        from_attributes=True
    )





# ==========================
# TOKEN SCHEMAS
# ==========================


class TokenResponse(BaseModel):

    message: str

    access_token: str

    token_type: str