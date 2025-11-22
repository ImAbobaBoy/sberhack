import datetime
import uuid

from sqlalchemy import Column
from sqlalchemy.dialects.postgresql.json import JSONB
from sqlmodel import Field, SQLModel


class BookBase(SQLModel):
    title: str = Field(max_length=255, nullable=False)
    author: str = Field(max_length=255, nullable=False)
    pages_count: int = Field(nullable=False)
    publisher: str = Field(max_length=255, nullable=False)
    genre: str = Field(max_length=255, nullable=False)
    year_published: int = Field(nullable=False)
    location_published: str | None = Field(max_length=255, nullable=True)
    additional_columns: dict | None = Field(sa_column=Column(JSONB, nullable=True))


class Book(BookBase, table=True):
    __tablename__ = "books"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: str = Field(default_factory=datetime.datetime.now)
