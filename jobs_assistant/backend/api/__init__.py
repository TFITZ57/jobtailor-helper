from fastapi import APIRouter
from .linkedin import router as linkedin_router
from .company import router as company_router
from .documents import router as documents_router

api_router = APIRouter()

api_router.include_router(linkedin_router)
api_router.include_router(company_router)
api_router.include_router(documents_router) 