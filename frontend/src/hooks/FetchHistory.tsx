import { DataItem } from "../utils/types";
import { url } from "./useAuth";
async function fetchHistory(): Promise<DataItem[] | null> {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${url}/api/search-history/`, {
      method: "GET",
      headers: {
        "Authorization": `token ${token}`,
      },
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
