import React from 'react'
import HistoryBox from "../components/HistoryBox";
import Searchbox from "../components/Searchbox";
import NavBar from '../components/NavBar';

const Home : React.FC = () => {
  return (
    <div>
        <NavBar/>
        <Searchbox />
        <HistoryBox />
    </div>
  )
}

export default Home