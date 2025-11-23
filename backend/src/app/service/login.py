from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.core.security import generate_code
from src.app.crud import login as login_crud
from src.app.crud import user as user_crud
from src.app.db.models.pincode import PinCodeCreate
from src.app.db.models.user import UserCreate
from src.app.utils.emails import send_code_on_email


async def send_code(session: AsyncSession, email: str):
    if (user := await user_crud.get_user(session, email=email)) is None:
        raise HTTPException(status_code=404, detail="User not found")
    code_create = PinCodeCreate(
        code=generate_code(),
        user_id=user.id,
    )
    code = await login_crud.create_code(session, code_create=code_create)
    await send_code_on_email(email, code)
    return {"message": "PinCode is sent"}

async def register_user_and_send_code(session: AsyncSession, user_create: UserCreate):
    if (user := await user_crud.get_user(session, email=user_create.email)) is not None:
        raise HTTPException(status_code=400, detail="User already exists")
    user = await user_crud.create_user(session, user_create=user_create)
    await send_code(session, email=user.email)
    return {"message": "User is registered and PIN is sent"}

async def verify_code(session: AsyncSession, email: str, code: str) -> bool:
    if (user := await user_crud.get_user(session, email=email)) is None:
        raise HTTPException(status_code=404, detail="User not found")
    if not await login_crud.verify_code(session, email=user.email, code=code):
        raise HTTPException(status_code=400, detail="Invalid code")
    await login_crud.mark_code_as_used(session, user_id=user.id, code=code)
    return True
