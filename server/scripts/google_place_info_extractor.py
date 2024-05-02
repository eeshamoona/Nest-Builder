import os
import requests
from dotenv import load_dotenv

load_dotenv()

def get_google_info(address, place, home_address):
    """
    Retrieves the place ID, Google Maps URL link, a photo, and distance from home address for a given address.
    Args:
        address (str): The full address of the place to search for.
        place (str): The name of the place.
        home_address (str): The full home address to calculate the distance to the place.
    Returns:
        dict: A dictionary containing the place ID, Google Maps URL link, a photo, and the distance and duration to home address for the given address.
    """
    API_KEY = os.getenv('REACT_APP_placesAPIKey', '')
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    distance_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    params = {
        "input": f"{place} {address}",
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
                else:
                    photo_url = None

                # ...

                # Get the distance
                distance_params = {
                    "origins": home_address,
                    "destinations": address,
                    "key": API_KEY,
                    "units": "imperial"
                }
                distance_response = requests.get(distance_url, params=distance_params)
                distance_data = distance_response.json()
                if distance_data["status"] == "OK":
                    distance_info = distance_data["rows"][0]["elements"][0]
                    if distance_info["status"] == "OK":
                        distance = distance_info["distance"]["text"]
                        duration = distance_info["duration"]["text"]
                    else:
                        print(f"Distance info status not OK: {distance_info}")  # Print the distance info if status is not OK
                        distance = "Unavailable"
                        duration = "Unavailable"
                else:
                    print(f"Distance data status not OK: {distance_data}")  # Print the distance data if status is not OK
                    distance = "Error"
                    duration = "Error"

                return {"placeID": place_id, "mapsLink": google_maps_link, "photoURL": photo_url, "distance": distance, "duration": duration}
            else:
                return {"placeID": None, "mapsLink": None, "photoURL": None, "distance": "No place found", "duration": None}
        else:
            return {"placeID": None, "mapsLink": None, "photoURL": None, "distance": "API error", "duration": None}
    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return {"placeID": None, "mapsLink": None, "photoURL": None, "distance": "Request Exception", "duration": None}

