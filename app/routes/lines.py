from fastapi import APIRouter, Depends
from ..databases.urbs import urbs_service
from ..utils.format import format_coord, format_shape
from ..auth.jwt_auth import get_current_user
from fastapi_cache.decorator import cache
import pandas as pd

router = APIRouter()

@router.get("/lines")
@cache(86400)
async def read_linhas(email = Depends(get_current_user)):
    linhas = urbs_service.get_linhas()
    if not linhas:
        return {"message": "lines not found"}
    return linhas

@router.get("/stops/{line_id}")
@cache(86400)
async def read_pontos(line_id: str, email = Depends(get_current_user)):
    line = urbs_service.get_pontos_linha(line_id)
    df = pd.DataFrame(line)
    df['COORD'] = df.apply(lambda row: format_coord(row['LAT'], row['LON']), axis=1)
    df = df.drop(['LAT', 'LON'], axis=1)
    line = df.to_dict(orient='records')
    return line

@router.get("/shape/{line_id}")
@cache(86400)
async def read_shape(line_id: str, email = Depends(get_current_user)):
    shape = urbs_service.get_shape(line_id)
    if not shape:
        return {"message": "shape not found"}
    return format_shape(shape)