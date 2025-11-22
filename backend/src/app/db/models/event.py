import datetime
import uuid

from sqlmodel import Field, SQLModel


class EventBase(SQLModel):
    name: str = Field(max_length=255, nullable=False)
    description: str = Field(max_length=1024, nullable=False)
    start_time: datetime.datetime = Field(nullable=False)
    end_time: datetime.datetime | None = Field(nullable=True)
    location: str = Field(max_length=255, nullable=False)


class Event(EventBase, table=True):
    __tablename__ = "events"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
