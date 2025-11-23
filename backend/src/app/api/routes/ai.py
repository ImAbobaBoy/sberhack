import uuid

from fastapi import APIRouter, HTTPException
from transformers import AutoModelForCausalLM, AutoTokenizer

from src.app.api.dependencies.common import SessionDep
from src.app.db.models.book import Book

router = APIRouter(tags=["ai"])

model_name = "EleutherAI/gpt-neo-125M"  # лёгкая модель для CPU
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)


@router.post("/book_summary")
async def generate_summary(session: SessionDep, book_id: uuid.UUID):
    if (book := await session.get(Book, book_id)) is None:
        raise HTTPException(status_code=404, detail="Book not found")
    prompt = f"Краткий сюжет книги '{book.title}' автора {book.author} (не более 300 символов):"

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_new_tokens=100,  # примерно 300 символов
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
    )
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

    summary = summary[len(prompt):].strip()

    return {"title": book.title, "author": book.author, "summary": summary[:300]}
