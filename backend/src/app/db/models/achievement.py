import datetime
import uuid

from sqlmodel import Field, SQLModel


class AchievementBase(SQLModel):
    name: str = Field(max_length=255, nullable=False)
    description: str = Field(max_length=1024, nullable=False)
    picture_url: str = Field(max_length=1024, nullable=False)


class Achievement(AchievementBase, table=True):
    __tablename__ = "achievements"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
