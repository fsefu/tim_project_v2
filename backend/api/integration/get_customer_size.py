import json
import requests

def get_customer_size(id, klaviyo_api_key):
    url = f"https://a.klaviyo.com/api/v2/group/{id}/members/all?api_key={klaviyo_api_key}"

    headers = {"accept": "application/json"}

    response = requests.get(url, headers=headers)

    data = json.loads(response.text)

    if "records" in data and data["records"]:
        num_records = len(data["records"])
    else:
        # Return None if the key 'data' does not exist or is empty
        num_records = 0

    return num_records
