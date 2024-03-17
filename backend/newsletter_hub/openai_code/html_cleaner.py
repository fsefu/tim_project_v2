import re
from bs4 import BeautifulSoup
from html.parser import HTMLParser

# html_content = """
# <p>Subject: Exciting News from The Raw Honey Shop: Winter Remedies and New Healing Honeys!</p>
# <p>*Dear Valued Customers,*</p>
# <p>It has been quite a challenging winter season, marked by sore throats, coughs, and the ongoing battle against various viruses. The Raw Honey Shop is here
# to offer you natural remedies to help ease your discomfort and boost your health during these trying times.</p>
# <p>**Special Offer:** Get 20% off on all honey products this month!</p>
# """


def format_text(text):
    # Remove specified tags
    remove_tags = ["html", "meta", "header", "body"]
    for tag in remove_tags:
        text = re.sub(rf"<{tag}.*?\/{tag}>", "", text, flags=re.DOTALL)

    # Replace text starting with "Subject" with <h> tag
    text = re.sub(r"(?m)^(<p>Subject:.*)$", r"<h>\1</h>", text)

    # Replace text within * or ** with <strong> tag
    text = re.sub(r"\*(.*?)\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", text)

    return text


def html_cleaner(html_content):
    soup = BeautifulSoup(html_content, "html.parser")

    tags = soup.find_all()

    def replace_special_offer(text, asteriks):
        first_index = text.find(asteriks)
        if first_index != -1:
            text = text[:first_index] + "<h2>" + text[first_index + len(asteriks) :]
            second_index = text.find(asteriks)
            if second_index != -1:
                text = (
                    text[:second_index] + "</h2>" + text[second_index + len(asteriks) :]
                )
                if text.startswith("<p><h2>") and text.endswith("</h2></p>"):
                    text = text.replace("<p><h2>", "<h2>")
                    text = text.replace("</h2></p>", "</h2>")
        return text

    def extract_tag_element_and_clean_html(html_tag):

        soup = BeautifulSoup(html_tag, "html.parser")

        tag_element = soup.find().name

        pattern = re.compile(rf"<{tag_element}>|</{tag_element}>")

        cleaned_html = pattern.sub("", html_tag)

        return cleaned_html, tag_element

    if tags:
        first_tag = tags[0]
        first_tag.name = "h1"
        text = first_tag.get_text()
        text = text.replace("Subject:", "").strip()
        text = text.strip("*").strip()
        text = text.strip("**").strip()
        first_tag.string = text

    for tag in tags[1:]:
        text = tag.get_text()
        if "*" in text and not text.startswith("**"):
            result = replace_special_offer(str(tag), "*")
            cleaned_html, tag_element = extract_tag_element_and_clean_html(result)
            print("res: ", result)
            print("tag_element: ", tag_element, "  ", "cleaned_html  ", cleaned_html)
            tag.name = tag_element
            tag.string = cleaned_html
        if "**" in text:
            result = replace_special_offer(str(tag), "**")
            cleaned_html, tag_element = extract_tag_element_and_clean_html(result)
            print("res: ", result)
            tag.name = tag_element
            tag.string = cleaned_html
        if "#" in text and not text.startswith("##"):
            result = replace_special_offer(str(tag), "#")
            cleaned_html, tag_element = extract_tag_element_and_clean_html(result)
            print("res: ", result)
            print("tag_element: ", tag_element, "  ", "cleaned_html  ", cleaned_html)
            tag.name = tag_element
            tag.string = cleaned_html
        if "##" in text:
            result = replace_special_offer(str(tag), "##")
            cleaned_html, tag_element = extract_tag_element_and_clean_html(result)
            print("res: ", result)
            tag.name = tag_element
            tag.string = cleaned_html

    class MyHTMLParser(HTMLParser):
        def __init__(self):
            super().__init__()
            self.result = ""

        def handle_starttag(self, tag, attrs):
            self.result += f"<{tag}>"

        def handle_endtag(self, tag):
            self.result += f"</{tag}>"

        def handle_data(self, data):
            self.result += data

    def parse_html(html_string):
        # Instantiate the HTML parser
        parser = MyHTMLParser()
        # Feed the HTML string to the parser
        parser.feed(html_string)
        # Return the parsed HTML result
        return parser.result

    parsed_html = parse_html(soup.prettify())
    return parsed_html
