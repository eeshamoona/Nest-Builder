# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS  # new
import datetime
from werkzeug.utils import secure_filename
import tempfile
import os

from scripts.system_instruction_api_request import generate_content
from scripts.profile_extractor_api_request import generate_profile

app = Flask(__name__)
CORS(app)  # new

@app.route('/generate-content', methods=['POST'])
def generate_content_route():
    data = request.get_json()
    system_instruction = data.get('system_instruction', '')
    search_prompt = data.get('search_prompt', '')
    result = generate_content(system_instruction, search_prompt)
    return result.replace("```json\n", "").replace("```", "")

@app.route('/generate-profile', methods=['POST'])
def generate_profile_route():
  if 'file' not in request.files:
    print("No file in request")
    return 'No file part'
  file = request.files['file']
  system_instruction = request.form.get('system_instruction', '')

  print(f"File: {file} is queued for processing")

  try:
    result = generate_profile(file, system_instruction)
    print(f"Server Result: {result}")
  except Exception as e:
    print(f"Error while generating profile: {e}")
    raise

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