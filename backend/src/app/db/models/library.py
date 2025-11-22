import datetime
import uuid

from sqlmodel import Field, SQLModel


class LibraryBase(SQLModel):
    name: str = Field(max_length=255, nullable=False)
    address: str = Field(max_length=255, nullable=False)
    phone_number: str = Field(max_length=20, nullable=False)


class Library(LibraryBase, table=True):
    __tablename__ = "libraries"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
