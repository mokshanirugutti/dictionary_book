import "./App.css";
import HistoryBox from "./components/HistoryBox";

import Searchbox from "./components/Searchbox";

function App() {
  return (
    <div>
      <h1 className="text-3xl  text-center m-10">Dictionary</h1>
      
      
        <Searchbox />
        <HistoryBox />
      
    
    </div>
  );
}

export default App;
