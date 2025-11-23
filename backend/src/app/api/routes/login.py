import datetime

from fastapi import APIRouter, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.app.service.login as login_service
import src.app.service.user as user_service
from src.app.api.dependencies.common import SessionDep
from src.app.core.security import create_access_token
from src.app.core.settings import get_project_settings
from src.app.db.models.user import UserCreate, UserPublic
from src.app.db.schemas import Message, Token

router = APIRouter(tags=["login"])

settings = get_project_settings()

async def authenticate(
    session: AsyncSession,
    email: str,
    code: str,
) -> UserPublic | None:
    db_user = await user_service.get_user(
        session=session,
        email=email,
    )
    if not db_user:
        return None
    if not (await verify_code(session, email, code)):
        return None
    return db_user


@router.post("/access-token")
async def login_access_token(
    session: SessionDep,
    email: str,
    code: str,
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = await authenticate(
        session=session,
        email=email,
        code=code,
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or code")
    access_token_expires = datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=create_access_token(
            str(user.id),
            expires_delta=access_token_expires,
        ),
    )

@router.post("/auth/send_code", response_model=Message)
async def send_code(session: SessionDep, email: str) -> Message:
    await login_service.send_code(session, email=email)
    return Message(message="PinCode is sent")

@router.post("/auth/register_user_and_send_code", response_model=Message)
async def register_user_and_send_code(session: SessionDep, user_create: UserCreate) -> Message:
    await login_service.register_user_and_send_code(session, user_create=user_create)
    return Message(message="User is registered and PIN is sent")

async def verify_code(session: SessionDep, email: str, code: str) -> Message:
    await login_service.verify_code(session, email=email, code=code)
    return Message(message="Code is verified")
