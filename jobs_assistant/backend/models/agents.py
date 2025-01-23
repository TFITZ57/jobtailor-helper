from typing import Annotated, Sequence, TypeVar
from langgraph.graph import END, Graph
from langgraph.prebuilt import ToolExecutor
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_openai import ChatOpenAI
from langchain.tools import BaseTool
from pydantic import BaseModel

from .state import ApplicationState, JobApplication
from .tools import LinkedInTool, CompanyResearchTool, DocumentAnalysisTool, DocumentGenerationTool

# Type definitions
StateType = TypeVar("StateType", bound=ApplicationState)

def create_agent(tools: Sequence[BaseTool], system_prompt: str):
    """Create a LangChain agent with tools and system prompt."""
    llm = ChatOpenAI(model="gpt-4-turbo-preview", temperature=0)
    tool_executor = ToolExecutor(tools)
    
    def agent_fn(state: StateType, messages: Sequence[BaseMessage]) -> StateType:
        """Agent function that processes the current state and messages."""
        # Execute agent logic here
        return state

    return agent_fn

# Define agents for each step
linkedin_agent = create_agent(
    tools=[LinkedInTool()],
    system_prompt="Extract and analyze LinkedIn profile data for job applications."
)

company_research_agent = create_agent(
    tools=[CompanyResearchTool()],
    system_prompt="Research and analyze company information for job applications."
)

document_analysis_agent = create_agent(
    tools=[DocumentAnalysisTool()],
    system_prompt="Analyze resumes and cover letters for job applications."
)

document_generation_agent = create_agent(
    tools=[DocumentGenerationTool()],
    system_prompt="Generate tailored resumes and cover letters based on job requirements."
)

def create_workflow() -> Graph:
    """Create the job application workflow graph."""
    
    workflow = Graph()

    # Define the workflow edges
    workflow.add_node("linkedin_analysis", linkedin_agent)
    workflow.add_node("company_research", company_research_agent)
    workflow.add_node("document_analysis", document_analysis_agent)
    workflow.add_node("document_generation", document_generation_agent)

    # Define edges
    workflow.add_edge("linkedin_analysis", "company_research")
    workflow.add_edge("company_research", "document_analysis")
    workflow.add_edge("document_analysis", "document_generation")
    workflow.add_edge("document_generation", END)

    return workflow

def process_application(state: ApplicationState) -> ApplicationState:
    """Process a job application through the workflow."""
    workflow = create_workflow()
    final_state = workflow.invoke(state)
    return final_state 