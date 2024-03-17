from fastapi import APIRouter
from hashlib import sha256
from ..databases.mongodb import mongo_db
from pydantic import BaseModel
from ..utils.validators import validate_email, validate_cpf, validate_birthday, validate_cellphone

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
        return {"error": "Invalid email"}
    if not validate_cpf(user.cpf):
        return {"error": "Invalid CPF"}
    if not validate_birthday(user.birthday):
        return {"error": "Invalid birthday"}
    if not validate_cellphone(user.cellphone):
        return {"error": "Invalid cellphone"}
    user.password = sha256(user.password.encode()).hexdigest()
    mongo_db.client.tcc.users.insert_one(user.dict())
    return {"message": "User registered successfully"}