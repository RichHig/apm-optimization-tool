# backend/app/config.py
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from a .env file

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/apmdb")
# Add other configurations as needed
