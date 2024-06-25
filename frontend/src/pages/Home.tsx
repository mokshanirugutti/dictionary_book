import React from 'react'
import HistoryBox from "../components/HistoryBox";
import Searchbox from "../components/Searchbox";
import { useNavigate } from 'react-router-dom';


const Home : React.FC = () => {
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");

  };
  return (
    <div>
      <button onClick={handlelogout}>logout</button>
      <h1 className="text-3xl  text-center m-10">Dictionary</h1>
        <Searchbox />
        <HistoryBox />
    </div>
  )
}

export default Home