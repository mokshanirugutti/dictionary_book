const deleteHistoryEntry = async (id: number): Promise<string | null> => {
  console.log(`id got is ${id}`);
  
    try {
      const response = await fetch(`http://localhost:8000/api/search-history/${id}/`, {
        method: 'DELETE',
      });
      console.log('tried to delete history entry');
      
  
      if (!response.ok) {
        throw new Error(`Failed to delete history entry: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.message;
  
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export default deleteHistoryEntry;
  