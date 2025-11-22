from sqlalchemy.ext.asyncio import AsyncSession

from src.app.core.settings import get_project_settings
from src.app.crud import user as user_crud
from src.app.db.models.user import User, UserPublic, UsersPublic, UserUpdate

project_settings = get_project_settings()

async def get_users(
    session: AsyncSession,
    skip: int = 0,
    limit: int = project_settings.DEFAULT_QUERY_LIMIT,
) -> UsersPublic:
    return await user_crud.get_users(
        session=session,
        skip=skip,
        limit=limit,
    )

async def update_user(
    session: AsyncSession,
    db_user: User,
    user_in: UserUpdate,
) -> UserPublic:
    return UserPublic.model_validate(
        await user_crud.update_user(
            session=session,
            db_user=db_user,
            user_in=user_in,
        ),
    )

async def delete_user(
    session: AsyncSession,
    user_in: User,
) -> bool:
    return await user_crud.delete_user(
        session=session,
        user_in=user_in,
    )
