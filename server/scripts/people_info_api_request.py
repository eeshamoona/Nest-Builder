import requests

def fetch_people_info(token):
    person_fields = "genders,birthdays,addresses,locations"
    url = f"https://people.googleapis.com/v1/people/me?personFields={person_fields}&access_token={token}"
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.get(url, headers=headers)
    print("Response from people info API", response.status_code)
    if response.status_code == 200:
        return response.json()
    else:
        return None