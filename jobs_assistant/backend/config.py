from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    # LinkedIn API (if using)
    LINKEDIN_CLIENT_ID: str | None = None
    LINKEDIN_CLIENT_SECRET: str | None = None
    
    # OpenAI
    OPENAI_API_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings() 