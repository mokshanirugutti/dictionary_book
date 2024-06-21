import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FetchMeaning from "../hooks/FetchMeaning";
import ResultsBox from "./ResultsBox";
import {MeanData} from "../utils/types";
import SkeletonBox from "./SkeletonBox";

const Searchbox: React.FC = () => {
  const [word,setWord] = useState("");
  const [wordMeaning,setWordMeaning] = useState<MeanData | null> (null)
  const [loading,setLoading] = useState<boolean>(false);
  const handleSearchClick = async () => {
    setLoading(true);
    const meaning  = await FetchMeaning(word)
    setLoading(false);
    setWordMeaning(meaning);
  };
  return (
    <div>
      <label className="relative block w-1/4 mx-auto">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
        <div className="flex justify-center items-center">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search.."
            type="text"
            name="search"
            value={word}
            onChange={(e) => setWord(e.currentTarget.value)}
          />
          <button
            onClick={handleSearchClick}
            className="ml-2 focus:outline-none"
          >
            <SearchIcon />
          </button>
        </div>
      </label>
      
      
      {loading && <SkeletonBox />}
      {wordMeaning && <ResultsBox data={wordMeaning}/> }
    </div>
  );
};

export default Searchbox;
