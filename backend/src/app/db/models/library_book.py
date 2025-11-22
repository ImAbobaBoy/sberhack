import datetime
import uuid

from sqlmodel import Field, SQLModel


class LibraryBookBase(SQLModel):
    ...


class LibraryBook(LibraryBookBase, table=True):
    __tablename__ = "library_books"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    library_id: uuid.UUID = Field(foreign_key="libraries.id", nullable=False)
    book_id: uuid.UUID = Field(foreign_key="books.id", nullable=False)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
