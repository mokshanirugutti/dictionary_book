  interface wordMeaning{
    definition: string;
    example?:string;
  }
  interface definition_type{
    noun?:wordMeaning;
    verb?:wordMeaning;
  }
  interface MeanData {
    id: number;
    word: string;
    definition_data: definition_type;
  }
  interface DefinitionData {
    example: string;
    definition: string;
  }
  
  interface Word {
    id: number;
    word: string;
    definition_data: {
      noun?: DefinitionData;
      verb?: DefinitionData;
      adjective?: DefinitionData;
    };
  }
  
  interface DataItem {
    id: number;
    word: Word;
    search_timestamp: string;
  }
  
// export MeanData
export  type { MeanData , DataItem };