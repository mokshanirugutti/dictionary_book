import { MeanData }  from "../utils/types";
import { url } from "./useAuth";
async function fetchMeaning(word: string): Promise<MeanData | null> {
  const token = localStorage.getItem("token");
  // console.log(token);
  try {
    const response = await fetch(`${url}/api/words/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`,
      },
      body: JSON.stringify({ word }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch meaning for "${word}": ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      id : data.id,
      word: data.word,
      definition_data: data.definition_data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default fetchMeaning;
