from fastapi import APIRouter
from ..databases.redis_connection import redis_client
from ..databases.urbs import urbs_service
from ..utils.format import format_coord, format_shape
import pandas as pd
import json

router = APIRouter()

@router.get("/lines")
async def read_linhas():
    linhas = redis_client.get("linhas")
    if linhas:
        print("Cache hit for linhas")
        return json.loads(linhas)
    linhas = urbs_service.get_linhas()
    if not linhas:
        return {"message": "lines not found"}
    redis_client.set("linhas", json.dumps(linhas), ex=86400)
    return linhas

@router.get("/stops/{line_id}")
async def read_pontos(line_id: str):
    line = redis_client.get(line_id)
    if line:
        print("Cache hit for line_id: ", line_id)
        return json.loads(line)
    line = urbs_service.get_pontos_linha(line_id)
    if not line:
        return {"message": "line not found"}
    df = pd.DataFrame(line)
    df['COORD'] = df.apply(lambda row: format_coord(row['LAT'], row['LON']), axis=1)
    df = df.drop(['LAT', 'LON'], axis=1)
    line = df.to_dict(orient='records')
    redis_client.set(line_id, json.dumps(line), ex=86400)
    return line

@router.get("/shape/{line_id}")
async def read_shape(line_id: str):
    shape = redis_client.get(line_id)
    if shape:
        print("Cache hit for shape: ", line_id)
        return json.loads(shape)
    shape = urbs_service.get_shape(line_id)
    if not shape:
        return {"message": "shape not found"}
    shape = format_shape(shape)
    redis_client.set(line_id, json.dumps(shape), ex=86400)
    return format_shape(shape)