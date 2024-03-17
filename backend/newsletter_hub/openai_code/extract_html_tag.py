import re


def format_text(text):
    # Remove specified tags
    remove_tags = ["html", "meta", "header", "body"]
    for tag in remove_tags:
        text = re.sub(rf"<{tag}.*?\/{tag}>", "", text, flags=re.DOTALL)

    # Replace text starting with "Subject" with <h> tag
    text = re.sub(r"(?m)^(Subject:.*)$", r"<h>\1</h>", text)

    # Replace text within * or ** with <strong> tag
    text = re.sub(r"\*(.*?)\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", text)

    return text


def extract_html_tags(text):
    # Find text enclosed within ```html``` and extract
    html_match = re.search(r"```html(.*?)```", text, flags=re.DOTALL)
    if html_match:
        html_text = html_match.group(1)
        return html_text
    return ""
