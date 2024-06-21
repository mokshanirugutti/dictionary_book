import requests

def fetch_word_definition(word):
    url = f'https://api.dictionaryapi.dev/api/v2/entries/en/{word}'
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code != 200:
        return {"error": "Failed to fetch data from the dictionary API"}

    response = response.json()
    
    # Check if the response contains data
    if not response:
        return {"error": "No data found for the given word"}
    
    result = {}
    word_data = response[0]  # Assuming response contains only one word entry
    result['word'] = word_data['word']
    result['definitions'] = {}

    # Iterate through meanings to extract definitions
    for meaning in word_data['meanings']:
        part_of_speech = meaning['partOfSpeech']
        definitions = meaning['definitions']

        # Choose the first definition for each part of speech
        selected_definition = definitions[0]
        definition_entry = {
            "definition": selected_definition['definition']
        }

        # Add example sentence if available
        if 'example' in selected_definition:
            definition_entry['example'] = selected_definition['example']

        result['definitions'][part_of_speech] = definition_entry

    return result