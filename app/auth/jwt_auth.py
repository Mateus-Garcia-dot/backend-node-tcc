from typing import Union, Any
from datetime import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from ..utils.jwt import ALGORITHM, JWT_SECRET_KEY
from jose import jwt
from pydantic import ValidationError

bearer_scheme = HTTPBearer()

async def get_current_user(token: str = Depends(bearer_scheme)):
    try:
        payload = jwt.decode(token.credentials, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        if datetime.fromtimestamp(payload.get("exp")) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload.sub