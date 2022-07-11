import logo from './logo.svg';
import './App.css';
import CreatePollForm from './components/CreatePollForm';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Poll from '../src/components/Poll'
import AllPolls from '../src/components/AllPolls'


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


      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route exact index element={<CreatePollForm />} />
            <Route exact path='/createPoll' element={<CreatePollForm />} />
            <Route exact path='/poll/:id' element={<Poll />} />
            <Route exact path='/polls' element={<AllPolls />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
