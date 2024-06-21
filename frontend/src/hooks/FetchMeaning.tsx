import { MeanData }  from "../utils/types";

async function fetchMeaning(word: string): Promise<MeanData | null> {
  try {
    const response = await fetch(`http://localhost:8000/api/words/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      word: data.word,
      definition_data: data.definition_data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default fetchMeaning;
