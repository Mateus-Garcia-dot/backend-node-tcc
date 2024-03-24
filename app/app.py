from fastapi import Depends, FastAPI
from app.auth.jwt_auth import get_current_user
from app.routes import users, lines

app = FastAPI()

app.include_router(users.router)
app.include_router(lines.router)

@app.get("/")
async def root():
    return {"message": "Hi, I'm good :)"}
