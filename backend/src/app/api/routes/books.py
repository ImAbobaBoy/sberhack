import uuid

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from src.app.api.dependencies.common import SessionDep
from src.app.api.dependencies.users import (
    CurrentUser,
)
from src.app.db.models.book import Book, BookCreate, BookPublic, BooksPublic

router = APIRouter(tags=["books"])

@router.get("/books", response_model=BooksPublic)
async def get_books(session: SessionDep):
    results = await session.execute(select(Book))
    books = results.all()
    return BooksPublic(
        data=[BookPublic.model_validate(book) for book, in books],
        count=len(books),
    )

@router.get("/books/{book_id}")
async def get_book(book_id: uuid.UUID, session: SessionDep):
    book = await session.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return BookPublic.model_validate(book)

@router.post("/books", response_model=BookPublic)
async def create_book(
    session: SessionDep,
    book_create: BookCreate,
):
    book = Book.model_validate(book_create)
    session.add(book)
    await session.commit()
    await session.refresh(book)
    return BookPublic.model_validate(book)
