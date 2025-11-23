from dataclasses import dataclass

import emails

from src.app.core.settings import get_project_settings, get_smtp_settings
from src.app.db.models.pincode import PinCode

smtp_settings = get_smtp_settings()
project_settings = get_project_settings()


@dataclass
class EmailData:
    html_content: str
    subject: str


async def send_email(
    *,
    email_to: str,
    subject: str = "",
    html_content: str = "",
):
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(smtp_settings.EMAILS_FROM_NAME, smtp_settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": smtp_settings.HOST, "port": smtp_settings.PORT}
    smtp_options["user"] = smtp_settings.USER
    smtp_options["password"] = smtp_settings.PASSWORD
    smtp_options["tls"] = smtp_settings.TLS
    print(smtp_options)
    response = message.send(to=email_to, smtp=smtp_options)
    return response

async def send_code_on_email(email_to: str, code: PinCode) -> None:
    subject = f"{project_settings.NAME} - Ваш пин код"
    html_content = f"<p>Ваш пин код: <strong>{code.code}</strong></p>"
    response = await send_email(email_to=email_to, subject=subject, html_content=html_content)
    print(f"Email sent status: {response}")
