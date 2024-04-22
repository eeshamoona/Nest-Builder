import tempfile
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()

def generate_profile(file, system_instruction):
  API_KEY = os.getenv('REACT_APP_geminiAIKey', "")
  print("API_KEY:", API_KEY)
  genai.configure(api_key=API_KEY)

  GENERATION_CONFIG = {
    "temperature": 1,
  }

  JSON_PROMPT = """
  IMPORTANT: Your ONLY output should be an array of category recommendations in a structured JSON array format that matches the following model:
    {
      "<category_name>": {
        "properties": {
          "userPreferences": {
            "description": "A paragraph about what the user usually prefers in this category based on the file input, important for context on the user, do not repeat the subcategories here if they are already in the subcategories field"
          },
          "environmentDescriptors": {
            "description": "A list of 6 adjectives that describe the environment of the category, the user will pick some of these to describe the category"
          },
          "relatedSubcategories": {
            "description": "A list of subcategories that are related to this category (e.g. for a restaurant category, the subcategories could be cuisines like 'Italian', 'Mexican', etc.)"
          },
          "confidence": {
            "description": "A number between 0 (not confident) and 1 (confident) that represents how confident you are in the recommendations for this category"
          }
        }
      }
    }
  """
  system_instruction = system_instruction + " " + JSON_PROMPT
  
  # Create a temporary file and save the uploaded file to it
  temp_file = tempfile.NamedTemporaryFile(suffix=".txt", delete=False)
  file.save(temp_file.name)

  print("File saved to:", temp_file.name)

  file_path = temp_file.name

  sample_file = genai.upload_file(path=file_path, display_name="googleTakeoutData.txt")

  model = genai.GenerativeModel(
    "models/gemini-1.5-pro-latest",
    system_instruction=system_instruction,
    generation_config=GENERATION_CONFIG,
    
  )

  response = model.generate_content(["Follow the system instructions", sample_file.name])

  return response.text