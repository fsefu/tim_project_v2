import os
import time
from .models import ExtractedImage
import fitz  # PyMuPDF
import io
from PIL import Image


def image_extractor(file_path, parentId, output_dir):

    # file_path = "Artwork.pdf"

    # output_dir = "batch_images"
    output_format = "png"
    min_width = 100
    min_height = 100

    # if not os.path.exists(output_dir):
    #     os.makedirs(output_dir)

    pdf_file = fitz.open(file_path)

    for page_index in range(len(pdf_file)):
        page = pdf_file[page_index]
        image_list = page.get_images(full=True)
        if image_list:
            print(f"[+] Found a total of {len(image_list)} images in page {page_index}")
        else:
            print(f"[!] No images found on page {page_index}")
        for image_index, img in enumerate(image_list, start=1):
            # Get the XREF of the image
            xref = img[0]
            # Extract the image bytes
            base_image = pdf_file.extract_image(xref)
            image_bytes = base_image["image"]
            # Get the image extension
            image_ext = base_image["ext"]
            # Load it to PIL
            image = Image.open(io.BytesIO(image_bytes))
            timestamp = time.strftime("%Y%m%d%H%M%S")

            if image.width >= min_width and image.height >= min_height:

                image_instance = ExtractedImage.objects.create(
                    file_id_id=parentId,
                    page_number=page_index + 1,
                    image_file_name=f"batch_{parentId}-page_{page_index+1}_{timestamp}.{output_format}",
                )

                # Check if the image meets the minimum dimensions and save it
                image.save(
                    open(
                        os.path.join(
                            output_dir,
                            f"batch_{parentId}-page_{page_index+1}_{timestamp}.{output_format}",
                        ),
                        "wb",
                    ),
                    format=output_format.upper(),
                )
            else:
                print(
                    f"[-] Skipping image {image_index} on page {page_index} due to its small size."
                )
