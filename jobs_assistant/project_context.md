# Job Application Assistant Specification

## Overview

This document outlines the architecture and workflow for a Job Application Assistant. The assistant is designed to help users craft tailored resumes and cover letters for specific job postings by leveraging their LinkedIn profiles, current resumes, and cover letters.

## Key Features

- **LinkedIn Integration**: Extract relevant details from the user's LinkedIn URL.
- **Resume and Cover Letter Analysis**: Analyze the user's uploaded documents.
- **Job Card Analysis**: Understand the job posting and company details.
- **Company Research**: Gather insights about the company to tailor the application.
- **Document Generation**: Create a professional resume and cover letter tailored to the job.

## Workflow

1. **Input Collection**:
   - User provides LinkedIn URL, current resume, cover letter, and job card.
   - Use the `AddJobModal` component for input collection.

2. **Data Extraction**:
   - Extract relevant details from LinkedIn using a scraping or API service.
   - Parse the resume and cover letter for key information.

3. **Company Research**:
   - Use external APIs or web scraping to gather company information.
   - Store and manage data using Supabase for vector storage.

4. **Contextual Analysis**:
   - Analyze job card details to understand job requirements.
   - Use Langgraph to model the workflow and decision-making process.

5. **Document Generation**:
   - Generate a tailored resume and cover letter using AI models.
   - Ensure the output is professional and aligned with the job requirements.

## Integration Points

- **Frontend**:
  - Use components like `JobCard`, `AddJobModal`, and `AppSidebar` for UI interactions.
  - Ensure seamless data flow between the frontend and backend using WebSockets.

- **Backend**:
  - Implement a FastAPI service to handle data processing and AI model interactions.
  - Use Supabase for database management and file storage.

## Technologies

- **Langgraph**: Framework for modeling the assistant's workflow.
- **Supabase**: Database and file storage solution.
- **FastAPI**: Backend framework for serving the assistant.
- **WebSockets**: For real-time communication between the frontend and backend.

## Additional Considerations

- **Security**: Ensure data privacy and security, especially when handling user documents.
- **Scalability**: Design the system to handle multiple users and large datasets efficiently.
- **User Experience**: Focus on creating an intuitive and seamless user interface.

## References

- **Frontend Components**: Refer to `src/components` for UI elements.
- **Backend Services**: Check `src/integrations/supabase` for database interactions.
- **Utility Functions**: Utilize `src/lib/utils.ts` for common operations.

## File Structure

### Backend

- **api/**: API route handlers for LinkedIn, company research, and document generation.
  - `linkedin.py`: Handles LinkedIn scraping/API integration.
  - `company.py`: Manages company research and data gathering.
  - `documents.py`: Responsible for document generation and processing.

- **models/**: Defines data models and schemas.
  - `state.py`: LangGraph state definitions and configurations.
  - `agents.py`: Agent definitions for different processing steps.
  - `prompts.py`: Prompt templates for different processing steps.
  - `tools.py`: Tool definitions for different processing steps.
  - `schemas.py`: Pydantic models for data validation.

- **utils/**: Utility functions for various backend operations.
  - `supabase.py`: Supabase integration utilities.
  - `websocket.py`: WebSocket connection handlers.
  - `parser.py`: Document parsing utilities.

- **config.py**: Configuration settings and environment variables.
- **main.py**: FastAPI application entry point.
- **requirements.txt**: Python dependencies.

### Frontend

- **src/components**: Contains UI components for the application.
- **src/pages**: Includes main application pages like `Assistant.tsx`.
- **src/index.css**: Main CSS file using Tailwind CSS for styling.

### Configuration and Build

- **tsconfig.json**: TypeScript configuration.
- **package.json**: Node.js project configuration and dependencies.
- **tailwind.config.ts**: Tailwind CSS configuration.

## Summary

The Job Application Assistant is a comprehensive tool designed to streamline the job application process by integrating various data sources and leveraging AI for document generation. The backend, built with FastAPI, handles data processing and storage, while the frontend, developed with React and Tailwind CSS, provides an intuitive user interface. The system is designed to be scalable and secure, ensuring a seamless experience for users.