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

app = Flask(__name__)
CORS(app)  

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
    data = request.get_json()
    system_instruction = data.get('system_instruction', '')
    search_prompt = data.get('search_prompt', '')
    result = generate_content(system_instruction, search_prompt)
    return result.replace("```json\n", "").replace("```", "")

@app.route('/generate-profile', methods=['POST'])
def generate_profile_route():
  print("Processing request in generate_profile_route")
  
  if 'file' not in request.files:
    print("No file in request")
    return 'No file part'
  
  file = request.files['file']
  system_instruction = request.form.get('system_instruction', '')

  try:
    print("Generating profile...", file, system_instruction)
    result = generate_content_with_file(file, system_instruction)
    print("Profile generated successfully")
  except Exception as e:
    print(f"Error while generating profile: {e}")
    raise

  print("Sending response...", result)
  return jsonify(result.replace("```json\n", "").replace("```", "")), 200
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