import React from 'react'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Poll from '../components/Poll'

export default function AllPolls() {
    const [allPolls, setAllPolls] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/poll")
      .then(function (response) {
        setAllPolls(response.data);
      });

  }, [])
  return (
    <div>
        {allPolls.map(poll => {
          return <Poll key={poll._id} pollId={poll._id} />
        })}
    </div>
  )
}

