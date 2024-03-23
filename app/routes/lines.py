from fastapi import APIRouter
from ..databases.redis_connection import redis_client
from ..databases.urbs import urbs_service
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
        return {"message": "Linha não encontrada"} 
    redis_client.set(line_id, json.dumps(line), ex=30)
    return line
    

