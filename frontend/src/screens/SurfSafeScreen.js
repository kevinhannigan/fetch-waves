import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Calendar from '../components/Calendar'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import '../css/WaveCard.css'

const SurfSafeScreen = ({ match }) => {
    const [safetyDetail, setSafetyDetail] = useState({})
    const [morningUpButtonVariant, setMorningUpButtonVariant] = useState('outline-primary')
    const [morningDownButtonVariant, setMorningDownButtonVariant] = useState('outline-primary')
    const [morningUpDisabled, setMorningUpDisabled] = useState(false)
    const [morningDownDisabled, setMorningDownDisabled] = useState(true)
    const [afternoonUpButtonVariant, setAfernoonUpButtonVariant] = useState('outline-primary')
    const [afternoonDownButtonVariant, setAfernoonDownButtonVariant] = useState('outline-primary')
    const [afternoonUpDisabled, setAfernoonUpDisabled] = useState(false)
    const [afternoonDownDisabled, setAfernoonDownDisabled] = useState(true)
    const [eveningUpButtonVariant, setEveningUpButtonVariant] = useState('outline-primary')
    const [eveningDownButtonVariant, setEveningDownButtonVariant] = useState('outline-primary')
    const [eveningUpDisabled, setEveningUpDisabled] = useState(false)
    const [eveningDownDisabled, setEveningDownDisabled] = useState(true)


    useEffect(() => {
        const fetchSafety = async () => {
            const { data } = await axios.get(`/api/safety/${match.params.endPoint}/${match.params.year}/${match.params.month}/${match.params.day}`)
            setSafetyDetail(data)

        }
        fetchSafety()
    }, [match])

    const voteRequest = async (vote, tod) => {
        const { data } = await axios.put(`/api/safety/${match.params.endPoint}/${match.params.year}/${match.params.month}/${match.params.day}/${vote}/${tod}`)
        setSafetyDetail(data)
    }

    var startOfWeek = moment();
    var endOfWeek = moment().add(5, 'days');

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toISOString().split('T')[0]);
        day = day.clone().add(1, 'd');
    }

    return (
        <div className='py-2'>
            <div>
                <Link className='btn btn-primary my-3 px-2' to={`/waveforecast/${safetyDetail.endPoint}`} >Analysis</Link>
            </div>
            <div>
                <h1>Surf Safe </h1>
                <h3>{safetyDetail.city} </h3>
                <h3>{safetyDetail.month}-{safetyDetail.day}-{safetyDetail.year}</h3>
                <p>Upvote if you are heading out!</p>
            </div>
            <div className="safety">
                <Button
                    onClick={() => {
                        setMorningUpButtonVariant('primary')
                        setMorningUpDisabled(true)
                        setMorningDownDisabled(false)
                        voteRequest('upvote', 'Morning')
                    }}
                    variant={morningUpButtonVariant}
                    disabled={morningUpDisabled}
                >
                    <i className="fas fa-caret-up"></i>
                </Button>
                {' '}  Morning  {' '}
                <Button
                    onClick={() => {
                        setMorningDownButtonVariant('primary')
                        setMorningDownDisabled(true)
                        setMorningUpDisabled(false)
                        voteRequest('downvote', 'Morning')
                    }}
                    variant={morningDownButtonVariant}
                    disabled={morningDownDisabled}
                >
                    <i className="fas fa-caret-down"></i>
                </Button>
                <div className="counter">
                    {' '}{safetyDetail?.properties?.[0]?.count}
                </div>
            </div>
            <div className="safety">
                <Button
                    onClick={() => {
                        setAfernoonUpButtonVariant('primary')
                        setAfernoonUpDisabled(true)
                        setAfernoonDownDisabled(false)
                        voteRequest('upvote', 'Afternoon')
                    }}
                    variant={afternoonUpButtonVariant}
                    disabled={afternoonUpDisabled}
                >
                    <i className="fas fa-caret-up"></i>
                </Button>
                {' '}  Afternoon  {' '}
                <Button
                    onClick={() => {
                        setAfernoonDownButtonVariant('primary')
                        setAfernoonDownDisabled(true)
                        setAfernoonUpDisabled(false)
                        voteRequest('downvote', 'Afternoon')
                    }}
                    variant={afternoonDownButtonVariant}
                    disabled={afternoonDownDisabled}
                >
                    <i className="fas fa-caret-down"></i>
                </Button>
                <div className="counter">
                    {' '}{safetyDetail?.properties?.[1]?.count}
                </div>
            </div>
            <div className="safety">
                <Button
                    onClick={() => {
                        setEveningUpButtonVariant('primary')
                        setEveningUpDisabled(true)
                        setEveningDownDisabled(false)
                        voteRequest('upvote', 'Evening')
                    }}
                    variant={eveningUpButtonVariant}
                    disabled={eveningUpDisabled}
                >
                    <i className="fas fa-caret-up"></i>
                </Button>
                {' '}  Evening  {' '}
                <Button
                    onClick={() => {
                        setEveningDownButtonVariant('primary')
                        setEveningDownDisabled(true)
                        setEveningUpDisabled(false)
                        voteRequest('downvote', 'Evening')
                    }}
                    variant={eveningDownButtonVariant}
                    disabled={eveningDownDisabled}
                >
                    <i className="fas fa-caret-down"></i>
                </Button>
                <div className="counter">
                    {' '}{safetyDetail?.properties?.[2]?.count}
                </div>
            </div>
            <div>
            {days.map((day, index) => 
            <Calendar date={day} endPoint={match.params.endPoint} /> )}
        </div>
        </div>
    );
}

export default SurfSafeScreen
