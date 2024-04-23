import tempfile
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()

def generate_content_with_file(file, system_instruction):
  API_KEY = os.getenv('REACT_APP_geminiAIKey', "")
  print("API_KEY:", API_KEY)
  genai.configure(api_key=API_KEY)

  GENERATION_CONFIG = {
    "temperature": 1,
  
  }
  
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