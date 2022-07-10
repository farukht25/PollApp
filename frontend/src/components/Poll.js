import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import ProgressBar from './ProgressBar';

export default function Poll(pollId) {
    const [pollData, setPollData] = useState(
        {
            pollName: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            vote1: 0,
            vote2: 0,
            vote3: 0,
            vote4: 0,
            percentage1: 0,
            percentage2: 0,
            percentage3: 0,
            percentage4: 0,
        }
    );
    const [touched, setTouched] = useState(false)
    useEffect(() => {
        axios
            .get(`http://localhost:5000/poll/${pollId.pollId}`)
            .then(function (response) {
                const newpollData = { ...pollData }
                newpollData['pollName'] = response.data.pollName
                newpollData['option1'] = response.data.option1
                newpollData['option2'] = response.data.option2
                newpollData['option3'] = response.data.option3
                newpollData['option4'] = response.data.option4
                newpollData['vote1'] = parseInt(response.data.vote1)
                newpollData['vote2'] = parseInt(response.data.vote2)
                newpollData['vote3'] = parseInt(response.data.vote3)
                newpollData['vote4'] = parseInt(response.data.vote4)
                //
                const total = parseInt(response.data.vote1) + parseInt(response.data.vote2) +
                    parseInt(response.data.vote3) + parseInt(response.data.vote4)
                const p1 = (parseInt(response.data.vote1) / parseInt(total)) * 100;
                const p2 = (parseInt(response.data.vote2) / parseInt(total)) * 100;
                const p3 = (parseInt(response.data.vote3) / parseInt(total)) * 100;
                const p4 = (parseInt(response.data.vote4) / parseInt(total)) * 100;
                if (total !== 0) {
                    newpollData['percentage1'] = parseInt(p1)
                    newpollData['percentage2'] = parseInt(p2)
                    newpollData['percentage3'] = parseInt(p3)
                    newpollData['percentage4'] = parseInt(p4)
                }
                //
                setPollData(newpollData)
            })
            .catch(err => {
                if (err.response) {
                    console.log(err)
                }
            })
            ;

    }, [])
    const handleVote = (event) => {
        event.preventDefault()
        const name = event.target.name
        const newpollData = { ...pollData }

        newpollData[name] = parseInt(newpollData[name]) + 1;
        const total = parseInt(newpollData.vote1) + parseInt(newpollData.vote2) + parseInt(newpollData.vote3) + parseInt(newpollData.vote4)
        const p1 = (parseInt(newpollData.vote1) / parseInt(total)) * 100;
        const p2 = (parseInt(newpollData.vote2) / parseInt(total)) * 100;
        const p3 = (parseInt(newpollData.vote3) / parseInt(total)) * 100;
        const p4 = (parseInt(newpollData.vote4) / parseInt(total)) * 100;
        newpollData['percentage1'] = parseInt(p1)
        newpollData['percentage2'] = parseInt(p2)
        newpollData['percentage3'] = parseInt(p3)
        newpollData['percentage4'] = parseInt(p4)
        setPollData(newpollData)
        updateDB(newpollData);
        setTouched(true)
    }
    const updateDB = (newpollData) => {
        const pollObj = {
            pollName: newpollData.pollName,
            optionCount: 0,
            option1: newpollData.option1,
            vote1: newpollData.vote1,
            option2: newpollData.option2,
            vote2: newpollData.vote2,
            option3: newpollData.option3,
            vote3: newpollData.vote3,
            option4: newpollData.option4,
            vote4: newpollData.vote4,
        }
        axios.post(`http://localhost:5000/poll/update/${pollId.pollId}`, pollObj)
            .then((response) => {
                console.log(response);

            })
            .catch(err => {
                if (err.response) {
                    console.log(err)
                }
            })
    }

    return (
        <>
            <div className='container'>
                <h1>Q.{pollData.pollName}</h1>

                <h2>a.{pollData.option1}</h2>
                {/* {touched?<ProgressBar key='a' percentage={pollData.percentage1} />:<button type='button' name='vote1' onClick={e => handleVote(e)}>Vote</button>} */}
                
                <button type='button' name='vote1' onClick={e => handleVote(e)}>Vote</button>
                <ProgressBar key='a' percentage={pollData.percentage1} />

                <h2>b.{pollData.option2}</h2>
                {/* {touched?<ProgressBar key='b' percentage={pollData.percentage2} />:<button type='button' name='vote2' onClick={e => handleVote(e)}>Vote</button>} */}
                
                <button type='button' name='vote2' onClick={e => handleVote(e)}>Vote</button>
                <ProgressBar key='b' percentage={pollData.percentage2} />

                {(pollData.option3).length > 0 ? <>
                <h2>c.{pollData.option3}</h2> 
                {/* {touched?<ProgressBar key='c' percentage={pollData.percentage3} />:<button type='button' name='vote3' onClick={e => handleVote(e)}>Vote</button>} */}
                
                <button type='button' name='vote3' onClick={e => handleVote(e)}>Vote</button>
                <ProgressBar key='c' percentage={pollData.percentage3} />
                </> : null}

                {(pollData.option4).length > 0 ? <>
                <h2>d.{pollData.option4}</h2> 
                {/* {touched?<ProgressBar key='d' percentage={pollData.percentage4} />:<button type='button' name='vote4' onClick={e => handleVote(e)}>Vote</button>} */}
                
                <button type='button' name='vote4' onClick={e => handleVote(e)}>Vote</button>
                <ProgressBar key='d' percentage={pollData.percentage4} />
                </> : null}

            </div>
        </>
    )
}
