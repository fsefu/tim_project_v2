import json
import re
import requests
from .get_customer_size import get_customer_size
import time

all_data = {}


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


def get_data(url, klaviyo_api_key, item_type_from_params):
    headers = {
        "accept": "application/json",
        "revision": "2023-12-15",
        "Authorization": f"Klaviyo-API-Key {klaviyo_api_key}",
    }

    # response = requests.get(url, headers=headers)
    # data = json.loads(response.text)
    def request_data():
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for non-200 status codes
        return json.loads(response.text)

    data = exponential_backoff_retry(request_data)

    # Initialize lists for each attribute
    names = []
    created_at_list = []
    updated_at_list = []
    item_ids = []  # Store all item IDs
    members_at_list = []
    item_type_at_list = []
    link_at_list = []

    for item in data["data"]:
        item_id = item["id"]
        name = item["attributes"]["name"]
        created_at = item["attributes"]["created"]
        updated_at = item["attributes"]["updated"]
        if item_type_from_params == "List":
            url = f"https://a.klaviyo.com/api/lists/{item_id}/profiles/?page[size]=100"
        else:
            url = (
                f"https://a.klaviyo.com/api/segments/{item_id}/profiles/?page[size]=100"
            )

        members = get_customer_size(
            item_id, klaviyo_api_key, item_type_from_params, url
        )
        print("---" * 30)
        print("Members: ", members)
        print("---" * 30)

        item_type = item_type_from_params
        if item_type_from_params == "List":
            link = None
        else:
            formatted_string = re.sub(
                r"[^\w\s]", " ", name
            )  # Replace symbols with spaces
            formatted_string = re.sub(
                r"\s+", " ", formatted_string
            )  # Replace multiple spaces with single space
            formatted_string = formatted_string.strip().replace(" ", "-").lower()
            link = f"https://www.klaviyo.com/list/{item_id}/edit/{formatted_string}"

        # members = 10

        print("Item ID", item_id)
        # Append values to respective lists
        item_ids.append(item_id)  # Append item_id here
        names.append(name)
        created_at_list.append(created_at)
        updated_at_list.append(updated_at)
        members_at_list.append(members)
        item_type_at_list.append(item_type)
        link_at_list.append(link)

    # Extend lists to store data from multiple URL iterations
    all_data.setdefault("ID", []).extend(item_ids)
    all_data.setdefault("Name", []).extend(names)
    all_data.setdefault("Created At", []).extend(created_at_list)
    all_data.setdefault("Updated At", []).extend(updated_at_list)
    all_data.setdefault("Members", []).extend(members_at_list)
    all_data.setdefault("Type", []).extend(item_type_at_list)
    all_data.setdefault("Definition Link", []).extend(link_at_list)

    # Print or use data here if needed

    # Check if there's a next page
    if "next" in data["links"] and data["links"]["next"]:
        get_data(data["links"]["next"], klaviyo_api_key, item_type_from_params)

    return all_data


# import json
# import re
# import requests
# from .get_customer_size import get_customer_size

# all_data = {}
# def get_data(url, klaviyo_api_key, item_type_from_params):
#     headers = {
#         "accept": "application/json",
#         "revision": "2023-12-15",
#         "Authorization": f"Klaviyo-API-Key {klaviyo_api_key}"
#     }

#     response = requests.get(url, headers=headers)
#     data = json.loads(response.text)

#     # Initialize lists for each attribute
#     names = []
#     created_at_list = []
#     updated_at_list = []
#     item_ids = []  # Store all item IDs
#     members_at_list=[]
#     item_type_at_list=[]
#     link_at_list=[]

#     for item in data["data"]:
#         item_id = item['id']
#         name = item['attributes']['name']
#         created_at = item['attributes']['created']
#         updated_at = item['attributes']['updated']
#         members = get_customer_size(item_id, klaviyo_api_key)
#         item_type = item_type_from_params
#         if(item_type_from_params=="List"):
#             link=None
#         else:
#             formatted_string = re.sub(r'[^\w\s]', ' ', name)  # Replace symbols with spaces
#             formatted_string = re.sub(r'\s+', ' ', formatted_string)  # Replace multiple spaces with single space
#             formatted_string = formatted_string.strip().replace(" ", "-").lower()
#             link=f"https://www.klaviyo.com/list/{item_id}/edit/{formatted_string}"


#         # members = 10

#         print("Item ID", item_id)
#         # Append values to respective lists
#         item_ids.append(item_id)  # Append item_id here
#         names.append(name)
#         created_at_list.append(created_at)
#         updated_at_list.append(updated_at)
#         members_at_list.append(members)
#         item_type_at_list.append(item_type)
#         link_at_list.append(link)

#     # Extend lists to store data from multiple URL iterations
#     all_data.setdefault("ID", []).extend(item_ids)
#     all_data.setdefault("Name", []).extend(names)
#     all_data.setdefault("Created At", []).extend(created_at_list)
#     all_data.setdefault("Updated At", []).extend(updated_at_list)
#     all_data.setdefault("Members",[]).extend(members_at_list)
#     all_data.setdefault("Type",[]).extend(item_type_at_list)
#     all_data.setdefault("Definition Link",[]).extend(link_at_list)

#     # Print or use data here if needed

#     # Check if there's a next page
#     if "next" in data["links"] and data["links"]["next"]:
#         get_data(data["links"]["next"], klaviyo_api_key, item_type_from_params)

#     return  all_data
