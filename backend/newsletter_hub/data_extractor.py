import time

from .openai_code.newletter_generator import generate_newsletter
from .pdf_image_extractor import image_extractor
import cv2
import numpy as np
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import os
from .models import ExtractedText, NewsLetterData


use_gpu = cv2.cuda.getCudaEnabledDeviceCount() > 0


def data_extractor(pdf_path, parentId):
    print("parentId: ", parentId)
    os.makedirs("batch_texts", exist_ok=True)
    os.makedirs("batch_images", exist_ok=True)

    image_extractor(pdf_path, parentId, "batch_images")

    def process_batch(start, end, batch_number):
        combined_text = ""

        images = convert_from_path(pdf_path, first_page=start, last_page=end, dpi=200)
        for i, image in enumerate(images):
            # image = preprocess_image(image)

            text = pytesseract.image_to_string(image, lang="eng", config="--psm 3")
            combined_text = combined_text + text
        return combined_text

        # text_file_path = (
        # )
        # with open(text_file_path, "w", encoding="utf-8") as file:
        #     file.write(combined_text)
        # text_instance = ExtractedText.objects.create(
        #     file_id_id=parentId,
        #     page_number=4,
        #     text_file_name=text_file_path,
        # )
        print("combined_text:", combined_text)

    batch_size = 10
    total_pages = 20
    batches = (total_pages + batch_size - 1) // batch_size

    timestamp = time.strftime("%Y%m%d%H%M%S")
    text_file_path = f"batch_texts/batch_{parentId}_{timestamp}.txt"
    all_text = ""
    # for batch in range(batches):
    print("Batch: ", 0)
    start_page = 0 * batch_size + 1
    end_page = min(start_page + batch_size - 1, total_pages)
    all_text = process_batch(start_page, end_page, 0)
    # print("all_text: ", all_text)

    with open(text_file_path, "w", encoding="utf-8") as file:
        file.write(all_text)

    text_instance = ExtractedText.objects.create(
        file_id_id=parentId,
        page_number=4,
        text_file_name=text_file_path,
    )
    # if batch == batches - 1:
    parent_instance = NewsLetterData.objects.get(pk=parentId)
    parent_instance.mark_as_generated()

    newsletter_texts = ExtractedText.objects.filter(file_id=parentId)
    for text_instance in newsletter_texts:
        print(f"File ID: {text_instance.file_id_id}")
        print(f"Page Number: {text_instance.page_number}")
        print(f"Text File Name: {text_instance.text_file_name}")
        print("-" * 20)
        return generate_newsletter(
            text_instance.text_file_name, text_instance.file_id_id
        )
