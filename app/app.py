from fastapi import Depends, FastAPI
from app.auth.jwt_auth import get_current_user
from app.routes import users, lines
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)

app.include_router(lines.router)

@app.get("/")
async def root():
    return {"message": "Hi, I'm good :)"}
