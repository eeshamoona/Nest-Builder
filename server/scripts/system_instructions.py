from dotenv import load_dotenv
import os
import google.generativeai as genai
import traceback  # Import traceback for detailed error information

load_dotenv()

def generate_content(system_instruction, search_prompt):
  API_KEY = os.getenv('REACT_APP_geminiAIKey', "")
  print("API_KEY:", API_KEY)  # Print the API key to check if it's being loaded correctly
  if not API_KEY:
    print("API key is not set.")
    return None

  genai.configure(api_key=API_KEY)

  print("Searching for content related to:", search_prompt)

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
  try:
    print("Before calling model.generate_content")
    response = model.generate_content(search_prompt)
    print("After calling model.generate_content")
    print("Response:", response.text)
    return response.text
  except ValueError as ve:
    print("Caught ValueError:", ve)
    traceback.print_exc()  # Print the stack trace
    if response is not None:
      print(response.prompt_feedback)
      print(response.candidates[0].finish_reason)
      print(response.candidates[0].safety_ratings)
  except Exception as e:
    print("Caught Exception:", e)
    traceback.print_exc()  # Print the stack trace
  except:  # Catch all other exceptions
    print("Caught an unexpected error")
    traceback.print_exc()  # Print the stack trace
  return None