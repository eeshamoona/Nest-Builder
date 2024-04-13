# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS  # new
import datetime

from scripts.system_instruction_api_request import generate_content

app = Flask(__name__)
CORS(app)  # new

@app.route('/generate-content', methods=['POST'])
def generate_content_route():
    data = request.get_json()
    system_instruction = data.get('system_instruction', '')
    search_prompt = data.get('search_prompt', '')
    result = generate_content(system_instruction, search_prompt)
    return result.replace("```json\n", "").replace("```", "")
 
# Route for seeing a data
@app.route('/data')
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