import { DataItem } from "../utils/types";

async function fetchHistory(): Promise<DataItem[] | null> {
  try {
    const response = await fetch(`http://localhost:8000/api/search-history/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch History: ${response.statusText}`);
    }

    const data: DataItem[] = await response.json();
    console.log('history is', data);
    return data;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchHistory;
