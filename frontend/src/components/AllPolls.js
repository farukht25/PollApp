import React from 'react'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Poll from '../components/Poll'
import {  Link } from "react-router-dom";

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
          return (<><h1>{poll.pollName}</h1>
          <Link className="nav-link" to={'/poll/'+poll._id} >Visit Poll</Link>
          </>)
        })}
    </div>
  )
}

