from typing import List
from fastapi import APIRouter, Depends
from datetime import datetime
from pydantic import BaseModel, Field
from app.routes.users import User
from ..databases.urbs import urbs_service
from ..databases.elastic import get_elastic_client
from ..databases.redis_connection import redis_client
from ..utils.format import format_coord, format_shape
from ..databases.mongodb import mongo_db
from ..auth.jwt_auth import get_current_user
import pandas as pd
import json
import pytz

router = APIRouter(dependencies=[Depends(get_current_user)])

es = get_elastic_client()

@router.get("/lines")
async def read_linhas():
    linhas = redis_client.get("linhas")
    if linhas:
        print("Cache hit for linhas")
        return json.loads(linhas)
    linhas = urbs_service.get_linhas()
    mongo_db.client.tcc.lines.insert_one({ "data": linhas, "date": datetime.now() })
    if not linhas:
        return {"message": "lines not found"}
    redis_client.set("linhas", json.dumps(linhas), ex=86400)
    return linhas


@router.get("/stops/{line_id}")
async def read_pontos(line_id: str):
    line = redis_client.get(f"stops_{line_id}")
    if line:
        print("Cache hit for line_id: ", line_id)
        return json.loads(line)
    line = urbs_service.get_pontos_linha(line_id)
    if not line:
        return {"message": "line not found"}
    df = pd.DataFrame(line)
    df["COORD"] = df.apply(lambda row: format_coord(row["LAT"], row["LON"]), axis=1)
    df = df.drop(["LAT", "LON"], axis=1)
    line = df.to_dict(orient="records")

    table = urbs_service.get_tabela_linha(line_id)

    for stop in line:
        table_stops = [
            table_stop for table_stop in table if table_stop["NUM"] == stop["NUM"]
        ]
        stop["table"] = table_stops

    mongo_db.client.tcc.stops.insert_one({ "data": line, "date": datetime.now() })
    redis_client.set(f"stops_{line_id}", json.dumps(line), ex=86400)
    return line


@router.get("/shape/{line_id}")
async def read_shape(line_id: str):
    shape = redis_client.get(f"shape_{line_id}")
    if shape:
        print("Cache hit for shape: ", line_id)
        return json.loads(shape)
    shape = urbs_service.get_shape(line_id)
    if not shape:
        return {"message": "shape not found"}
    shape = format_shape(shape)
    mongo_db.client.tcc.shape.insert_one({ "data": shape, "date": datetime.now() })
    redis_client.set(f"shape_{line_id}", json.dumps(shape), ex=86400)
    return shape


@router.get("/vehicles")
async def read_veiculos():
    veiculos = redis_client.get("vehicles_all")
    if veiculos:
        print("Cache hit for vehicles")
        return json.loads(veiculos)
    veiculos = urbs_service.get_veiculos("")
    veiculos = [value for _, value in veiculos.items()]
    if not veiculos:
        return {"message": "vehicles not found"}
    redis_client.set("vehicles_all", json.dumps(veiculos), ex=120)
    mongo_db.client.tcc.vehicle_all.insert_one({ "data": veiculos, "date": datetime.now() })
    return veiculos


@router.get("/vehicles/{line_id}")
async def read_veiculos(line_id: str):
    veiculos = redis_client.get(f"vehicles_{line_id}")
    if veiculos:
        print("Cache hit for vehicles: ", line_id)
        return json.loads(veiculos)
    veiculos = urbs_service.get_veiculos(line_id)
    veiculos = [value for _, value in veiculos.items()]
    if not veiculos:
        return {"message": "vehicles not found"}
    mongo_db.client.tcc.vehicle.insert_one({ "data": veiculos, "date": datetime.now() })
    redis_client.set(f"vehicles_{line_id}", json.dumps(veiculos), ex=120)
    return veiculos


@router.get("/tableline/{line_id}")
async def read_veiculos(line_id: str):
    table = redis_client.get(f"line_table_{line_id}")
    if table:
        print("Cache hit for vehicles: ", line_id)
        return json.loads(table)
    table = urbs_service.get_tabela_linha(line_id)
    if not table:
        return {"message": "vehicles not found"}
    mongo_db.client.tcc.table_line.insert_one({ "data": table, "date": datetime.now() })
    redis_client.set(f"line_table_{line_id}", json.dumps(table), ex=86400)
    return table

class Coordinates(BaseModel):
    coordinates: List[float] = Field(..., min_items=2, max_items=2)

@router.post("/save_coordinates")
async def save_coordinates(coordinates: Coordinates, user: User = Depends(get_current_user)):
    data = {
        "email": user,
        "coordinates": coordinates.coordinates,
        "timestamp": datetime.now(pytz.utc)
    }
    es.index(index="coordinates", body=data)
    mongo_db.client.tcc.coordinates.insert_one(data)
    return {"message": "Coordinates saved successfully"}