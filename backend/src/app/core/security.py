import secrets
from datetime import datetime, timedelta

import jwt

from src.app.core.settings import get_project_settings

ALGORITHM = "HS256"

project_settings = get_project_settings()

def create_access_token(subject: str, expires_delta: timedelta) -> str:
    expire = datetime.now() + expires_delta
    to_encode = {"exp": expire, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, project_settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def generate_code(length: int = 6) -> str:
    return ''.join(secrets.choice("0123456789") for _ in range(length))
