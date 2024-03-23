from fastapi import APIRouter
from ..databases.redis_connection import redis_client
from ..databases.urbs import urbs_service
from ..utils.format import format_coord
import pandas as pd
import json

router = APIRouter(
    prefix="/lines",
)
@router.get("/pontos/{line_id}")
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
    