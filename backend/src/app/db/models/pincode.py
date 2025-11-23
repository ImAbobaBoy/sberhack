import datetime
import uuid
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

from src.app.core.settings import get_project_settings

if TYPE_CHECKING:
    from src.app.db.models.user import User

project_settings = get_project_settings()

class PinCodeBase(SQLModel):
    code: str = Field(max_length=10, nullable=False)
    expires_at: datetime.datetime = Field(
        nullable=False,
        default_factory=(
            lambda: datetime.datetime.now() + datetime.timedelta(
                minutes=project_settings.PINCODE_EXPIRE_MINUTES,
            )
        ),
    )
    attempts_left: int = 5
    used: bool = False
    user_id: uuid.UUID = Field(nullable=False, foreign_key="users.id")


class PinCode(PinCodeBase, table=True):
    __tablename__ = "pincodes"  # type: ignore

    id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)

    user: "User" = Relationship(back_populates="pincodes")


class PinCodeCreate(PinCodeBase):
    ...
