import tempfile
from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted
from google.api_core.exceptions import DeadlineExceeded
import re
import json
import time

load_dotenv()


def extract_json_from_output(output):
    # Regex to find JSON enclosed in ```json ``` markers
    pattern = r'```json\n([\s\S]*?)\n```'
    match = re.search(pattern, output)
    
    if match:
        # Extracting the JSON string from the regex match
        json_string = match.group(1)
        
        # Correctly handling escape sequences
        # First, ensure backslashes are correctly interpreted
        json_string = json_string.replace('\\\\', '\\')
        # Then replace escaped double quotes
        json_string = json_string.replace('\\"', '"')
        
        # Converting the JSON string into a Python dictionary
        try:
            return json.loads(json_string)
        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)
            raise e
    else:
        print("No JSON found")
        return None

def generate_content_with_file(file, system_instruction):
  API_KEY = os.getenv('REACT_APP_geminiAIKey', "")
  print("API_KEY:", API_KEY)
  genai.configure(api_key=API_KEY)

  GENERATION_CONFIG = {
   "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
  }

  SAFETY_SETTINGS = [
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_NONE"
        },
    ]
  
  temp_file = tempfile.NamedTemporaryFile(suffix=".txt", delete=True)
  file.save(temp_file.name)

  with open(temp_file.name, 'r', encoding='utf-8') as f:
      content = f.read(900000)

  model = genai.GenerativeModel(
      "models/gemini-1.5-pro-latest",
      system_instruction=system_instruction,
      generation_config=GENERATION_CONFIG,
      safety_settings=SAFETY_SETTINGS,
  )


  response = model.generate_content(["Follow the system instructions", content])

  response = None

  for _ in range(2):  # Retry up to 2 times
      try:
          response = model.generate_content(["Follow the system instructions", content])
          print("Original Response", response.text)
          newText = extract_json_from_output(response.text)
          break  # If successful, break the loop
      except DeadlineExceeded:
          print("Deadline exceeded. Retrying in 1 second...")
          time.sleep(1)
      except json.JSONDecodeError:
          print("JSON decode error. Retrying in 1 second...")
          time.sleep(1)
      except ResourceExhausted:
          print("Resource exhausted. Retrying in 10 second...")
          time.sleep(10)
      except ValueError:
          print("A value error occurred. Retrying in 1 second...")
          # If the response doesn't contain text, check if the prompt was blocked.
          if response is not None:
              print(response.prompt_feedback)
              # Also check the finish reason to see if the response was blocked.
              print(response.candidates[0].finish_reason)
              # If the finish reason was SAFETY, the safety ratings have more details.
              print(response.candidates[0].safety_ratings)
          time.sleep(1)  # Wait for 1 second
  else:  # If all retries fail
      print("Failed to generate content after 2 attempts.")
      return None

  return newText