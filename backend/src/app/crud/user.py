from typing import Any

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.core.security import get_password_hash, verify_password
from src.app.core.settings import get_project_settings
from src.app.db.models.user import (
    User,
    UserCreate,
    UserUpdate,
    UsersPublic,
)

project_settings = get_project_settings()


async def get_user(
    session: AsyncSession, **filters: Any,  # noqa: ANN401
) -> User | None:
    statement = select(User).filter_by(**filters)
    result = await session.execute(statement)
    user = result.scalar_one_or_none()
    return user

async def create_user(
    session: AsyncSession,
    user_create: UserCreate,
) -> User:
    if await get_user(
        session=session,
        email=user_create.email,
    ):
        raise HTTPException(
            status_code=409,
            detail="Пользователь с таким email уже существует",
        )
    hashed_password = get_password_hash(user_create.password)
    user = User(
        **user_create.model_dump(),
        hashed_password=hashed_password,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

async def get_users(
    session: AsyncSession,
    skip: int = 0,
    limit: int = project_settings.DEFAULT_QUERY_LIMIT,
) -> tuple[list[User]:
    statement = select(User).offset(skip).limit(limit)
    users = (await session.execute(
        statement,
    )).scalars().all()
    count = (await session.execute(
        select(func.count(User.id)))
    ).scalar_one()
    return users

async def delete_user(
    session: AsyncSession,
    user_in: User,
) -> None:
    await session.delete(user_in)
    await session.commit()
    return True

async def authenticate(
    session: AsyncSession,
    email: str, password: str,
) -> User | None:
    db_user = await get_user(session=session, email=email)

    if not db_user:
        return None
    if not verify_password(
        password, db_user.hashed_password,
    ):
        return None
    return db_user

async def update_user(
    session: AsyncSession,
    db_user: User,
    user_in: UserUpdate,
) -> User:
    user_data = user_in.model_dump(exclude_unset=True)

    for key, value in user_data.items():
        setattr(db_user, key, value)

    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user
