import argparse
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()

def generate_content(system_instruction, search_prompt):
  API_KEY = os.getenv('REACT_APP_geminiAIKey', "")
  genai.configure(api_key=API_KEY)


  GENERATION_CONFIG = {
  "temperature": 0.75,
  }

  model = genai.GenerativeModel(
    "models/gemini-1.5-pro-latest",
    system_instruction=system_instruction,
    generation_config=GENERATION_CONFIG,
  )

  response = model.generate_content(search_prompt)
  return response.text