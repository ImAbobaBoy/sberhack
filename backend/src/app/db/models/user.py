import datetime
import uuid

from pydantic import EmailStr, field_serializer
from sqlmodel import Field, SQLModel

from src.app.const import Variants


class Role(Variants):
    ADMIN = "admin"
    EMPLOYEE = "employee"
    USER = "user"

class UserBase(SQLModel):
    name: str = Field(max_length=255, nullable=False)
    surname: str = Field(max_length=255, nullable=False)
    patronymic: str = Field(max_length=255, nullable=False)
    role: Role = Field(default=Role.USER)
    email: EmailStr = Field(max_length=255, unique=True, nullable=False, index=True)
    date_of_birth: datetime.date

    @field_serializer("email")
    def serialize_email(self, email: EmailStr) -> str:
        return email.lower()


class User(UserBase, table=True):
    __tablename__ = "users" # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
