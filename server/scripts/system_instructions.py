from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.api_core.exceptions import DeadlineExceeded, ResourceExhausted
import re
import json
import time

load_dotenv()

def extract_json_from_output(output):
  replaced_output = output.replace("```json", "").replace("```", "")
  return json.loads(replaced_output)

def generate_content(system_instruction, search_prompt):
  API_KEY = os.getenv('REACT_APP_geminiAIKey', "")
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

  model = genai.GenerativeModel(
    "models/gemini-1.5-pro-latest",
    system_instruction=system_instruction,
    generation_config=GENERATION_CONFIG,
    safety_settings=SAFETY_SETTINGS,
  )

  response = None

  for _ in range(1): 
    try:
      response = model.generate_content(["Follow the system instructions and", search_prompt])
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