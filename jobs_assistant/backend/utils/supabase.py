from supabase import create_client
from ..config import settings

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

async def store_document(content: str, metadata: dict, doc_type: str):
    """Store a document in Supabase"""
    try:
        result = await supabase.table('documents').insert({
            'content': content,
            'metadata': metadata,
            'type': doc_type
        }).execute()
        return result.data
    except Exception as e:
        raise Exception(f"Failed to store document: {str(e)}")

async def get_document(doc_id: str):
    """Retrieve a document from Supabase"""
    try:
        result = await supabase.table('documents').select('*').eq('id', doc_id).execute()
        return result.data[0] if result.data else None
    except Exception as e:
        raise Exception(f"Failed to retrieve document: {str(e)}") 