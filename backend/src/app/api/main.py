from fastapi import APIRouter

from src.app.api.routes import (
    ai,
    books,
    healthcheck,
    login,
    users,
)

api_router = APIRouter()


api_router.include_router(
    users.router, tags=["users"], prefix="/users",
)
api_router.include_router(
    login.router, tags=["login"], prefix="/login",
)
api_router.include_router(
    healthcheck.router, tags=["healthcheck"],
)
api_router.include_router(
    ai.router, tags=["ai"], prefix="/ai",
)
api_router.include_router(
    books.router, tags=["books"], prefix="/books",
)
