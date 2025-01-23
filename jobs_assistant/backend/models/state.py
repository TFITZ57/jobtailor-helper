from typing import Dict, List
from pydantic import BaseModel

class JobApplication(BaseModel):
    job_description: str
    company_name: str
    company_info: Dict | None = None
    linkedin_data: Dict | None = None
    current_resume: str | None = None
    current_cover_letter: str | None = None
    
class ApplicationState(BaseModel):
    job_application: JobApplication
    generated_resume: str | None = None
    generated_cover_letter: str | None = None
    suggestions: List[str] = []
    errors: List[str] = []
    status: str = "pending"  # pending, processing, completed, failed 