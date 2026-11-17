import json
import os
import uuid
from datetime import datetime
from pathlib import Path

import streamlit as st

DB_PATH = Path(__file__).parent / "todos.json"


# ---------- JSON "database" helpers ----------
def load_todos() -> list[dict]:
    if not DB_PATH.exists():
        return []
    try:
        return json.loads(DB_PATH.read_text())
    except json.JSONDecodeError:
        st.error("todos.json is corrupted — starting with an empty list.")
        return []


def save_todos(todos: list[dict]) -> None:
    tmp = DB_PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(todos, indent=2))
    os.replace(tmp, DB_PATH)  # atomic swap


# ---------- Actions (run as widget callbacks) ----------
def add_todo():
    text = st.session_state.new_todo.strip()
    if text:
        todos = load_todos()
        todos.append({
            "id": uuid.uuid4().hex,
            "text": text,
            "done": False,
            "created": datetime.now().isoformat(timespec="seconds"),
        })
        save_todos(todos)
    st.session_state.new_todo = ""  # clear the input box


def toggle_todo(todo_id: str):
    todos = load_todos()
    for t in todos:
        if t["id"] == todo_id:
            t["done"] = not t["done"]
    save_todos(todos)


def delete_todo(todo_id: str):
    save_todos([t for t in load_todos() if t["id"] != todo_id])


def clear_completed():
    save_todos([t for t in load_todos() if not t["done"]])


# ---------- UI ----------
st.set_page_config(page_title="To-Do List", page_icon="✅")
st.title("✅ To-Do List")

st.text_input(
    "Add a task",
    key="new_todo",
    placeholder="What needs doing? (press Enter)",
    on_change=add_todo,
)

todos = load_todos()
filter_choice = st.radio("Show", ["All", "Active", "Completed"], horizontal=True)

visible = [
    t for t in todos
    if filter_choice == "All"
    or (filter_choice == "Active" and not t["done"])
    or (filter_choice == "Completed" and t["done"])
]

if not visible:
    st.info("Nothing here yet.")

for t in visible:
    col_check, col_del = st.columns([0.9, 0.1])
    with col_check:
        label = f"~~{t['text']}~~" if t["done"] else t["text"]
        st.checkbox(
            label,
            value=t["done"],
            key=f"chk_{t['id']}",
            on_change=toggle_todo,
            args=(t["id"],),
        )
    with col_del:
        st.button("🗑️", key=f"del_{t['id']}", on_click=delete_todo, args=(t["id"],))

st.divider()
remaining = sum(not t["done"] for t in todos)
c1, c2 = st.columns(2)
c1.caption(f"{remaining} of {len(todos)} tasks remaining")
if any(t["done"] for t in todos):
    c2.button("Clear completed", on_click=clear_completed)
