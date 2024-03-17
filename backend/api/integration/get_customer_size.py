import json
import time
import requests


def exponential_backoff_retry(func, max_retries=5, base_delay=1):
    for attempt in range(max_retries):
        try:
            return func()
        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                delay = base_delay * (2**attempt)
                print(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                print("Max retries exceeded.")
                raise


def get_customer_size(id, klaviyo_api_key, item_type_from_params, url, total_ids=0):
    print("Here inside the data: ", url)

    headers = {
        "accept": "application/json",
        "revision": "2024-02-15",
        "Authorization": f"Klaviyo-API-Key {klaviyo_api_key}",
    }

    def request_data(url):
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for non-200 status codes
        return json.loads(response.text)

    def process_page(url, total_ids):
        data = exponential_backoff_retry(lambda: request_data(url))
        id_count = sum(1 for item in data["data"] if "id" in item)
        total_ids += id_count

        if "next" in data["links"] and data["links"]["next"]:
            print("Fetching next page...")
            next_url = data["links"]["next"]
            return process_page(next_url, total_ids)
        else:
            return total_ids

    total_ids = process_page(url, total_ids)
    print("Total number of IDs:", total_ids)
    return total_ids


# def get_customer_size(id, klaviyo_api_key, item_type_from_params, url, total_ids=0):
#     print("Here inside the data: ", url)
#     # url = (
#     #     f"https://a.klaviyo.com/api/v2/group/{id}/members/all?api_key={klaviyo_api_key}"
#     # )
#     # if item_type_from_params == "List":
#     #     url = f"https://a.klaviyo.com/api/lists/{id}/profiles/?page[size]=100"
#     # else:
#     #     url = f"https://a.klaviyo.com/api/segments/{id}/profiles/?page[size]=100"

#     headers = {
#         "accept": "application/json",
#         "revision": "2024-02-15",
#         "Authorization": f"Klaviyo-API-Key {klaviyo_api_key}",
#     }
#     # headers = {
#     #     "accept": "application/json",
#     # }

#     def request_data():
#         response = requests.get(url, headers=headers)
#         response.raise_for_status()  # Raise an error for non-200 status codes
#         return json.loads(response.text)

#     # response = requests.get(url, headers=headers)
#     data = exponential_backoff_retry(request_data)
#     # data = json.loads(response.text)
#     # print("data: ", data)
#     id_count = sum(1 for item in data["data"] if "id" in item)
#     total_ids += id_count

#     if "next" in data["links"] and data["links"]["next"]:
#         print("Fetching next page...")
#         next_url = data["links"]["next"]
#         # Recursively call member_size with the next page URL and the accumulated total_ids
#         get_customer_size(
#             id, klaviyo_api_key, item_type_from_params, next_url, total_ids
#         )
#     else:
#         # If there is no next page, print the total number of IDs across all pages
#         print("Total number of IDs:", total_ids)
#     # if "records" in data and data["records"]:
#     #     num_records = len(data["records"])
#     # else:
#     #     num_records = 0

#     return total_ids
