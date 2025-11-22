import datetime
import uuid

from sqlmodel import Field, SQLModel


class LibraryTicketBase(SQLModel):
    expiration_date: datetime.datetime = Field(nullable=False)


class LibraryTicket(LibraryTicketBase, table=True):
    __tablename__ = "library_tickets"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
