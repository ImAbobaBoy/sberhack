from dataclasses import dataclass
from pathlib import Path
from typing import Any

import emails
from jinja2 import Template

from src.app.core.settings import get_project_settings, get_smtp_settings

smtp_settings = get_smtp_settings()
project_settings = get_project_settings()


@dataclass
class EmailData:
    html_content: str
    subject: str


async def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_str = (
        Path(__file__).parent.parent / "email-templates" / "build" / template_name
    ).read_text()
    html_content = Template(template_str).render(context)
    return html_content


async def send_email(
    *,
    email_to: str,
    subject: str = "",
    html_content: str = "",
) -> None:
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(smtp_settings.EMAILS_FROM_NAME, smtp_settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": smtp_settings.HOST, "port": smtp_settings.PORT}
    smtp_options["user"] = smtp_settings.USER
    smtp_options["password"] = smtp_settings.PASSWORD
    smtp_options["tls"] = True
    response = message.send(to=email_to, smtp=smtp_options)
    return response

async def generate_reset_password_email(email_to: str, email: str, token: str) -> EmailData:
    subject = f"{project_settings.NAME} - Password recovery for user {email}"
    link = f"{project_settings.FRONTEND_HOST}/reset-password?token={token}"
    html_content = await render_email_template(
        template_name="reset_password.html",
        context={
            "project_name": project_settings.NAME,
            "username": email,
            "email": email_to,
            "link": link,
        },
    )
    return EmailData(html_content=html_content, subject=subject)
