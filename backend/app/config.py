import os
from dotenv import load_dotenv

# Load environment variables from a local .env file if present
load_dotenv()

# Mongo connection settings
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "productivitytracker")
