import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Calendar from '../components/Calendar'
import moment from 'moment'
import { Button, Alert } from 'react-bootstrap'
import '../css/WaveCard.css'

const SurfSafeScreen = ({ match }) => {
    const [safetyDetail, setSafetyDetail] = useState({})
    const [errorMessage, setErrorMessage] = useState(undefined)


    useEffect(() => {
        const fetchSafety = async () => {
            const { data } = await axios.get(`/api/safety/${match.params.endPoint}/${match.params.location}/${match.params.year}/${match.params.month}/${match.params.day}`)
            setSafetyDetail(data)
        }
        fetchSafety()
    }, [match.params.endPoint, match.params.location, match.params.year, match.params.month, match.params.day ])

    const addUserRequest = async (vote, tod) => {
        try {
            const { data } = await axios.post(`/api/safety/${match.params.endPoint}/${match.params.location}/${match.params.year}/${match.params.month}/${match.params.day}/${vote}/${tod}`)
            console.log(data)
            setSafetyDetail(data)
        } catch (err) {
            setErrorMessage(err.response.data)
        }
    }

    var startOfWeek = moment();
    var endOfWeek = moment().add(3, 'days');

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toISOString().split('T')[0]);
        day = day.clone().add(1, 'd');
    }

    return (
        <div className='detail-container'>
            <div>
                <Link className='btn btn-primary my-3 px-2' to={`/surfsafe/${match.params.endPoint}`} >Back</Link>
            </div>
            <div>
                <h1>Surf Safe </h1>
                <h3>{safetyDetail.location} - {safetyDetail.city} </h3>
                <h3>{safetyDetail.month}-{safetyDetail.day}-{safetyDetail.year}</h3>
                <p>Don't surf alone - vote if you are heading out!</p>
            </div>
            {errorMessage ? <Alert variant={'danger'}>{errorMessage}</Alert> : ''}
            <div className="votingSection">
                <div className="safety">
                    <div className="votingbuttons">
                        <Button
                            onClick={() => {
                                addUserRequest('like', 'Morning')
                            }}>
                            <i className="fas fa-caret-up"></i>
                        </Button>
                        {' '}  Morning  {' '}
                        <Button
                            onClick={() => {
                                addUserRequest('unlike', 'Morning')
                            }}>
                            <i className="fas fa-caret-down"></i>
                        </Button>
                    </div>
                    <div className="counter">
                        {' '}{safetyDetail?.properties?.[0]?.users.length}
                    </div>
                    <div>
                        <ul className="voting">
                            {safetyDetail?.properties?.[0]?.users.map((user, index) =>
                                <li className="listCount" key={index}>{user}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="safety">
                    <div className="votingbuttons">
                        <Button
                            onClick={() => {
                                addUserRequest('like', 'Afternoon')
                            }}>
                            <i className="fas fa-caret-up"></i>
                        </Button>
                        {' '}  Afternoon  {' '}
                        <Button
                            onClick={() => {
                                addUserRequest('unlike', 'Afternoon')
                            }}>
                            <i className="fas fa-caret-down"></i>
                        </Button>
                    </div>
                    <div className="counter">
                        {' '}{safetyDetail?.properties?.[1]?.users.length}
                    </div>
                    <div>
                        <ul className="voting">
                            {safetyDetail?.properties?.[1]?.users.map((user, index) =>
                                <li className="listCount" key={index}>{user}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="safety">
                    <div className="votingbuttons">
                        <Button
                            onClick={() => {
                                addUserRequest('like', 'Evening')
                            }}>
                            <i className="fas fa-caret-up"></i>
                        </Button>
                        {' '}  Evening  {' '}
                        <Button
                            onClick={() => {
                                addUserRequest('unlike', 'Evening')
                            }}>
                            <i className="fas fa-caret-down"></i>
                        </Button>
                    </div>
                    <div className="counter">
                        {' '}{safetyDetail?.properties?.[2]?.users.length}
                    </div>
                    <div>
                        <ul className="voting">
                            {safetyDetail?.properties?.[2]?.users.map((user, index) =>
                                <li className="listCount" key={index}>{user}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                {days.map((day, index) =>
                    <Calendar date={day} endPoint={match.params.endPoint} location={match.params.location} key={index} />)}
            </div>
        </div>
    ); 
}

export default SurfSafeScreen
