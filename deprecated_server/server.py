# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS  # new
import datetime
from werkzeug.utils import secure_filename
import tempfile
import os

from scripts.system_instructions import generate_content
from scripts.file_input_system_instructions import generate_content_with_file
from scripts.people_info_api_request import fetch_people_info
from scripts.google_drive_file_extractor import download_file
from scripts.google_place_info_extractor import get_google_info

app = Flask(__name__)
CORS(app)  

@app.route('/get-google-place-info', methods=['GET'])
def get_google_place_info_route():
    address = request.args.get('address', '')
    place = request.args.get('place', '')
    home_address = request.args.get('home_address', '')
    result = get_google_info(address, place, home_address)
    return jsonify(result)

@app.route('/get-google-drive-file', methods=['POST'])
def get_google_drive_file_route():
    data = request.get_json()
    file_id = data.get('file_id', '')
    oauth_token = data.get('oauth_token', '')
    result = download_file(file_id, oauth_token)
    return result

@app.route('/fetch-people-info', methods=['POST'])
def fetch_people_info_route():
    data = request.get_json()
    token = data.get('token', '')
    result = fetch_people_info(token)
    return jsonify(result)

@app.route('/generate-content', methods=['POST'])
def generate_content_route():
    print("Generating content")
    data = request.get_json()
    system_instruction = data.get('system_instruction', '')
    search_prompt = data.get('search_prompt', '')
    result = generate_content(system_instruction, search_prompt)
    return result

@app.route('/generate-profile', methods=['POST'])
def generate_profile_route():
  
  if 'file' not in request.files:
    return 'No file part'
  
  file = request.files['file']
  system_instruction = request.form.get('system_instruction', '')

  try:
    result = generate_content_with_file(file, system_instruction)
  except Exception as e:
    raise
  return result
# Route for seeing a data
@app.route('/')
def get_time():
  x = datetime.datetime.now()
 
  # Returning an api for showing in  reactjs
  return {
    'Name':"MS..AI", 
    "Age":"22",
    "Date": x.strftime("%m/%d/%Y, %H:%M:%S"), 
    "programming":"python"
    }
 
   
# Running app
if __name__ == '__main__':
  app.run(debug=True)