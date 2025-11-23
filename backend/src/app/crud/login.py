import datetime

from sqlalchemy import update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from src.app.db.models.pincode import PinCode, PinCodeCreate
from src.app.db.models.user import User


async def create_code(
    session: AsyncSession,
    code_create: PinCodeCreate,
) -> PinCode:
    code = PinCode.model_validate(code_create)
    session.add(code)
    await session.commit()
    await session.refresh(code)
    return code

async def verify_code(
    session: AsyncSession,
    email: str,
    code: str,
) -> bool:
    statement = (
        select(PinCode)
        .where(PinCode.code == code)
        .where(User.email == email)
        .where(PinCode.used == False)
        .where(PinCode.expires_at > datetime.datetime.now())
        .join(User)
    )
    result = await session.execute(statement)
    pin_code = result.scalar_one_or_none()
    return pin_code is not None

async def mark_code_as_used(
    session: AsyncSession,
    user_id: str,
    code: str,
) -> None:
    statement = (
        update(PinCode)
        .where(PinCode.code == code) # type: ignore
        .where(PinCode.user_id == user_id) # type: ignore
        .values(used=True)
    )
    await session.execute(statement)
    await session.commit()
