import logo from './logo.svg';
import './App.css';
import CreatePollForm from './components/CreatePollForm';
import { useEffect, useState } from 'react';
import axios from "axios";
import Poll from '../src/components/Poll'


function App() {
  const [allPolls, setAllPolls] = useState([]);
  useEffect(() => {
     axios
      .get("http://localhost:5000/poll")
      .then(function (response) {
        setAllPolls(response.data);
      });

  }, [])
  return (
    <div className="App">
      {/* <CreatePollForm/> */}
      {allPolls.slice(0,1).map(poll=>{
        return <Poll key={poll._id} pollId={poll._id}/>
      })}

    </div>
  );
}

export default App;
