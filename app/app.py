from fastapi import Depends, FastAPI
from app.auth.jwt_auth import get_current_user
from app.routes import users, lines
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from app.databases.redis_connection import redis_client
from contextlib import asynccontextmanager

@asynccontextmanager
async def startup(app: FastAPI):
    redis  = redis_client.client
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield

app = FastAPI(lifespan=startup)

app.include_router(users.router)
app.include_router(lines.router)

@app.get("/")
@cache(20)
async def root():
    return {"message": "Hello World"}