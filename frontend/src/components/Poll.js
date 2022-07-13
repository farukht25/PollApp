import React from 'react'
import { useEffect, useState } from 'react';
import { useParams,Navigate } from "react-router-dom";
import axios from "axios";
import ProgressBar from './ProgressBar';


export default function Poll({ pollId }) {
    const params = useParams();
    var id = (pollId ? pollId : params.id)
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
    const [selectedOption, setselectedOption] = useState("")
    const [voted, setVoted] = useState("")
    const [pollExists, setPollExists] = useState(true)
    
    useEffect(() => {

        axios
            .get(`http://localhost:5000/poll/${id}`)
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
                    console.log(pollData.pollName.length===0)
                    setPollExists(false)
                }
            })
            ;

    }, [])
    const selectOption = (event) => {
        event.preventDefault()
        const name = event.target.id
        
        if (selectedOption === name) return
        const newpollData = { ...pollData }
        if(selectedOption.length > 0){ 
            console.log(newpollData[selectedOption]+" will be "+newpollData[selectedOption]-1)
            newpollData[selectedOption] = parseInt(newpollData[selectedOption]) - 1;
        }
        setselectedOption(name)
        
        
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
        // updateDB(newpollData);
        
    }
    const updateDB = (event) => {
        event.preventDefault()
        const newpollData = { ...pollData }
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
        axios.post(`http://localhost:5000/poll/update/${id}`, pollObj)
            .then((response) => {
                console.log(response);

            })
            .catch(err => {
                if (err.response) {
                    
                }
            })
            setVoted(true)
    }

    if(!pollExists)return <Navigate to="/pageNotFound" />
    return (
        <>
            <div className='container border my-2 py-2'>
                <h1>Q.{pollData.pollName}</h1>


                <div class="form-check">
                    <input class="form-check-input" type="radio" name="option" id="vote1" checked={selectedOption === 'vote1'}
                        onClick={e => selectOption(e)} 
                        key={Math.random()}/>
                    <label class="form-check-label" for="option1">
                        a.{pollData.option1}
                    </label>
                </div>
                {voted && <ProgressBar barType='progress-bar bg-success' key='a' percentage={pollData.percentage1} />}




                <div class="form-check">
                    <input class="form-check-input" type="radio" name="option" id="vote2" checked={selectedOption === 'vote2'} 
                    key={Math.random()}
                    onClick={e => selectOption(e)} />
                    <label class="form-check-label" for="option2">
                        b.{pollData.option2}
                    </label>
                </div>
                {voted && <ProgressBar barType='progress-bar bg-info' key='b' percentage={pollData.percentage2} />}



                {pollData.option3 && <>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="option" id="vote3" checked={selectedOption === 'vote3'}
                        key={Math.random()} 
                        onClick={e => selectOption(e)} />
                        <label class="form-check-label" for="option3">
                            c.{pollData.option3}
                        </label>
                    </div>
                    {voted && <ProgressBar barType='progress-bar bg-warning' key='c' percentage={pollData.percentage3} />}

                </>}

                {pollData.option4 && <>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="option" id="vote4" checked={selectedOption === 'vote4'} 
                        key={Math.random()}
                        onClick={e => selectOption(e)} />
                        <label class="form-check-label" for="option4">
                            d.{pollData.option3}
                        </label>
                    </div>
                    {voted && <ProgressBar barType='progress-bar bg-danger' key='d' percentage={pollData.percentage4} />}


                </>}
                {!voted &&<button className="btn btn-primary m-2" type='button' onClick={e=>updateDB(e)}>Vote</button>}

            </div>
        </>
    )
}
