import { url } from "./useAuth";
const deleteHistoryEntry = async (id: number): Promise<string | null> => {
  // console.log(`id got is ${id}`);
  const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${url}/api/search-history/${id}/`, {
        method: 'DELETE',
        headers: {
          "Authorization": `token ${token}`,
        },
      });
      // console.log('tried to delete history entry');
      
  
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
  