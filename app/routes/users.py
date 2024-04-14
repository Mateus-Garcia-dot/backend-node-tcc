from fastapi import APIRouter, HTTPException, status
from app.utils.jwt import create_access_token
from ..databases.mongodb import mongo_db
from pydantic import BaseModel
from ..utils.validators import (
    validate_email,
    validate_cpf,
    validate_birthday,
    validate_cellphone,
)
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    name: str
    email: str
    birthday: str
    cellphone: str
    password: str
    cpf: str
 
def authenticate_user(email: str, password: str):
    user = mongo_db.client.tcc.users.find_one({"email": email})
    if not user:
        return False
    if not pwd_context.verify(password, user["password"]):
        return False
    return user

@router.post("/register")
async def register(user: User):
    if not validate_email(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email",
        )
    if not validate_cpf(user.cpf):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid CPF",
        )
    if not validate_birthday(user.birthday):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid birthday",
        )
    if not validate_cellphone(user.cellphone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid cellphone",
        )

    existing_user = mongo_db.client.tcc.users.find_one(
        {"$or": [{"email": user.email}, {"cpf": user.cpf}]}
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or CPF already exists",
        )

    user.password = pwd_context.hash(user.password)
    mongo_db.client.tcc.users.insert_one(user.dict())
    return {"message": "User registered successfully"}


@router.post("/login")
async def login(email: str, password: str):
    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token = create_access_token(
        data={"sub": email}
    )
    return {"access_token": access_token, "token_type": "bearer"}