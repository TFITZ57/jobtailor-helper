from pydantic import BaseModel, HttpUrl
from typing import List, Dict, Optional

class LinkedInProfile(BaseModel):
    name: str
    headline: Optional[str] = None
    experience: List[Dict]
    education: List[Dict]
    skills: List[str]

class CompanyInfo(BaseModel):
    name: str
    description: Optional[str] = None
    industry: Optional[str] = None
    size: Optional[str] = None
    location: Optional[str] = None
    culture: Optional[str] = None
    values: List[str] = []

class DocumentRequest(BaseModel):
    job_description: str
    company_info: CompanyInfo
    linkedin_data: Optional[LinkedInProfile] = None

class DocumentResponse(BaseModel):
    content: str
    suggestions: List[str] = []
    metadata: Dict = {} 