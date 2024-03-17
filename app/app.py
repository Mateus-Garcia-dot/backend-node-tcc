from fastapi import Depends, FastAPI
from app.auth.jwt_auth import get_current_user
from app.routes import users

app = FastAPI()

app.include_router(users.router)

@app.get("/")
async def root(user: dict = Depends(get_current_user)):
    return {"message": "Hello World"}