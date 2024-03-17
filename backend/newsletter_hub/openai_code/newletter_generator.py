import json

from django.http import HttpResponse

from newsletter_hub.models import NewsLetter, ExtractedText

from .extract_html_tag import extract_html_tags
from .html_cleaner import format_text, html_cleaner
from openai import OpenAI
from bs4 import BeautifulSoup


client = OpenAI()


def insert_news_letter(text_id, news_letter_content):
    try:
        # Retrieve the ExtractedText instance using the provided ID
        extracted_text = ExtractedText.objects.get(pk=text_id)

        # Create a new NewsLetter instance with the ExtractedText instance
        newsletter = NewsLetter(
            text_id=extracted_text, news_letter_content=news_letter_content
        )

        # Save the instance
        newsletter.save()

        # Return success message as an HTTP response
        return HttpResponse(
            "Newsletter Generated successfully.", status=201
        )  # 201 Created
    except ExtractedText.DoesNotExist:
        return HttpResponse(
            f"Error: ExtractedText with ID {text_id} does not exist.", status=404
        )  # 404 Not Found
    except Exception as e:
        # Return error message as an HTTP response if insertion fails
        return HttpResponse(
            f"Error inserting newsletter: {str(e)}", status=500
        )  # 500 Internal Server Error


def generate_newsletter(file_path, parentId):
    print("\n\n\n", "----" * 30)
    print(parentId)
    print("\n\n\n", "----" * 30)

    def content_generator(system_content, user_content):

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": system_content,
                },
                {
                    "role": "user",
                    "content": user_content,
                },
            ],
        )

        print(completion.choices[0].message.content)
        return completion.choices[0].message.content

    with open(file_path, "r") as file:
        data = file.read()
    system_content = "You are a email newsletter assistant, your role is generating the summary of the email newsletter from the user give data, do not use some deliminator like * or ** use appropriate tag for each."
    user_content = f"Can you generate email newsletter from this data {data}"
    email_newsletter_summary = content_generator(system_content, user_content)

    def filter_newsletter(email_data):
        email_data = email_data.replace("\n\n", "¾")

        splitted_text = email_data.split("¾")

        return splitted_text

    def newsletter_for_article(newsletter_data):
        new_data = newsletter_data[3:-2]
        return new_data

    print("\n" * 4)

    print("--" * 70)
    filtered_newletter_summary = filter_newsletter(email_newsletter_summary)
    system_content = "You role is adding each array element into html tag."
    user_content = f"Can add this to html tag {filtered_newletter_summary}"
    print(filtered_newletter_summary)
    data_with_html_tag = content_generator(system_content, user_content)

    html_text = extract_html_tags(data_with_html_tag)
    soup = BeautifulSoup(html_text, "html.parser")
    html_tags = [str(tag) for tag in soup.find_all()]
    final_html = "".join(html_tags)
    print("\n\n\n", "----" * 30)
    print(final_html)
    print("\n\n\n ", "---- " * 30)
    try:
        insert_news_letter(parentId, final_html)
        return HttpResponse(final_html, status=200)
    except Exception as e:
        # Return error message as an HTTP response if insertion fails
        return HttpResponse(
            f"Error generating and inserting newsletter: {str(e)}", status=500
        )  # 500 Internal Server Error
