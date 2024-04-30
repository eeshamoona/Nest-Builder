import os
import requests
from dotenv import load_dotenv

load_dotenv()
import requests
import requests
def get_google_info(address, business_name):
    """
    Retrieves the place ID, Google Maps URL link, and a photo for a given address.
    Args:
        address (str): The full address of the place to search for.
    Returns:
        dict: A dictionary containing the place ID, Google Maps URL link, and a photo for the given address.
    """
    API_KEY = os.getenv('REACT_APP_placesAPIKey', '')
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    params = {
        "input": f"{business_name} {address}",  # Include business name in the search query
        "inputtype": "textquery",
        "fields": "place_id",
        "key": API_KEY
    }

    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        if data["status"] == "OK":
            candidates = data.get("candidates", [])
            if candidates:
                place_id = candidates[0]["place_id"]
                google_maps_link = f"https://www.google.com/maps/place/?q=place_id:{place_id}"

                # Get the photo
                details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=photo&key={API_KEY}"
                details_response = requests.get(details_url)
                details_data = details_response.json()

                if "photos" in details_data["result"]:
                    photo_reference = details_data["result"]["photos"][0]["photo_reference"]
                    photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={API_KEY}"
                    return {"placeID": place_id, "mapsLink": google_maps_link, "photoURL": photo_url}
                else:
                    return {"placeID": place_id, "mapsLink": google_maps_link, "photoURL": None}
            else:
                return {"placeID": None, "mapsLink": None, "photoURL": None}
        else:
            return {"placeID": None, "mapsLink": None, "photoURL": None}
    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return None, None, None    