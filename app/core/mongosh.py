"""Render Python values as mongosh source code.

Queries and seed data are written once as Python structures. This module
turns them into the text shown in the app and saved in database/*.js, so
the code a reader sees is exactly the pipeline that runs.
"""
import json
import re

IDENTIFIER = re.compile(r"^[A-Za-z_$][\w$]*$")
INDENT = "  "


def to_js(value, width: int = 78, level: int = 0) -> str:
    """Inline when it fits in ``width`` columns, otherwise one item per line."""
    inline = _inline(value)
    if len(inline) + len(INDENT) * level <= width or not isinstance(value, (dict, list)):
        return inline

    pad = INDENT * (level + 1)
    if isinstance(value, dict):
        # The key shares the line with its value, so it takes from the width.
        items = [f"{pad}{_key(k)}: {to_js(v, width - len(_key(k)) - 2, level + 1)}"
                 for k, v in value.items()]
        return "{\n" + ",\n".join(items) + "\n" + INDENT * level + "}"
    items = [f"{pad}{to_js(v, width, level + 1)}" for v in value]
    return "[\n" + ",\n".join(items) + "\n" + INDENT * level + "]"


def call(collection: str, method: str, *args, width: int = 78) -> str:
    """db.<collection>.<method>(args) with the arguments pretty printed."""
    rendered = ", ".join(to_js(arg, width) for arg in args)
    return f"db.{collection}.{method}({rendered})"


def _inline(value) -> str:
    if isinstance(value, dict):
        return "{ " + ", ".join(f"{_key(k)}: {_inline(v)}" for k, v in value.items()) + " }" \
            if value else "{}"
    if isinstance(value, (list, tuple)):
        return "[" + ", ".join(_inline(v) for v in value) + "]"
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    return repr(value)


def _key(key: str) -> str:
    return key if IDENTIFIER.match(key) else json.dumps(key, ensure_ascii=False)


if __name__ == "__main__":
    assert to_js({"$match": {"a.b": 1, "x": "y"}}) == '{ $match: { "a.b": 1, x: "y" } }'
    assert to_js([1, None, True, 2.5]) == "[1, null, true, 2.5]"
    assert to_js({"k": list(range(40))}, width=20).startswith("{\n  k: [\n    0,")
    long = to_js({"$match": {"details.year": {"$gte": 2024}, "details.mpg": {"$gte": 35}}}, width=50)
    assert all(len(line) <= 50 for line in long.splitlines()), long
    print("ok")
