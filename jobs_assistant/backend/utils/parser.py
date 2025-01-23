from typing import Dict
import json
from fastapi import UploadFile
import docx
import PyPDF2
import io

async def parse_resume(file: UploadFile) -> Dict:
    """Parse resume content from various file formats"""
    content = ""
    try:
        if file.filename.endswith('.pdf'):
            content = await parse_pdf(file)
        elif file.filename.endswith('.docx'):
            content = await parse_docx(file)
        elif file.filename.endswith('.txt'):
            content = (await file.read()).decode('utf-8')
        else:
            raise ValueError("Unsupported file format")
        
        return {
            "content": content,
            "metadata": {
                "filename": file.filename,
                "content_type": file.content_type
            }
        }
    except Exception as e:
        raise Exception(f"Failed to parse resume: {str(e)}")

async def parse_pdf(file: UploadFile) -> str:
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(await file.read()))
        return " ".join(page.extract_text() for page in pdf_reader.pages)
    except Exception as e:
        raise Exception(f"Failed to parse PDF: {str(e)}")

async def parse_docx(file: UploadFile) -> str:
    """Extract text from DOCX file"""
    try:
        doc = docx.Document(io.BytesIO(await file.read()))
        return " ".join(paragraph.text for paragraph in doc.paragraphs)
    except Exception as e:
        raise Exception(f"Failed to parse DOCX: {str(e)}") 