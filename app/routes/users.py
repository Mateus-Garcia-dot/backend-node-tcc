from fastapi import APIRouter, HTTPException, status
from hashlib import sha256
from ..databases.mongodb import mongo_db
from pydantic import BaseModel
from ..utils.validators import (
    validate_email,
    validate_cpf,
    validate_birthday,
    validate_cellphone,
)

router = APIRouter()


class User(BaseModel):
    name: str
    email: str
    birthday: str
    cellphone: str
    password: str
    cpf: str



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

    user.password = sha256(user.password.encode()).hexdigest()
    mongo_db.client.tcc.users.insert_one(user.dict())
    return {"message": "User registered successfully"}
