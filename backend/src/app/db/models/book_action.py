import datetime
import uuid

from sqlmodel import Field, SQLModel

from src.app.const import Variants


class ActionType(Variants):
    TAKE = "take"
    TAKE_TO_REPAIR = "take_to_repair"
    RETURN = "return"
    RESERVE = "reserve"
    UNRESERVE = "unreserve"


class BookActionBase(SQLModel):
    action_type: str = Field(max_length=255, nullable=False)


class BookAction(BookActionBase, table=True):
    __tablename__ = "book_actions"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    library_book_id: uuid.UUID = Field(foreign_key="library_books.id", nullable=False)
    library_id: uuid.UUID = Field(foreign_key="libraries.id", nullable=False)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
