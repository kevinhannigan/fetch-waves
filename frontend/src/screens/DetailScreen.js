import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/WaveCard.css';
import DetailsTable from '../components/DetailsTable';
import DetailsChart from '../components/DetailsChart';
import DetailsCards from '../components/DetailsCards';

const DetailScreen = ({ match }) => {
    const [wave, setWave] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWave = async () => {
            const { data }  = await axios.get(`/api/waves/${match.params.endPoint}`)   
            setWave(data)
            setLoading(false)

        }
        fetchWave()
    }, [match])

    const timeFormat = (time) => {
        let date = new Date(time)
        return(date.toString())
      }
    
    
    // const todaysDate = (new Date()).toISOString().split('T')[0]
    // const year = todaysDate.split('-')[0]
    // const month = todaysDate.split('-')[1]
    // const day = todaysDate.split('-')[2]

    return (
        <div>
            {loading ? (
                <div><h3>Fetching Waves 🌊 🌊 🌊.</h3></div>
            ): (
            <div className="detail-container">
                <div className='py-2'>
                    <Link className='btn btn-light my-3 px-2' to='/'> Back </Link> {' '}
                    <Link className='btn btn-primary my-3 px-2' to={`/report/${wave.endPoint}`} > Report </Link>{' '}
                    <Link className='btn btn-secondary my-3 px-2' to={`/surfsafe/${wave.endPoint}`} > Surf Safe </Link>
                    <h1>{wave.city}</h1>
                    <h4>Last Updated: {timeFormat(wave.last_modified)}</h4>
                </div>
                <div>
                    <DetailsCards wave={wave} />
                </div>
                <div>
                <h2 className='py-3'>4 Day Forecast</h2>
                <a href='https://www.glerl.noaa.gov/res/glcfs/fcast/mwv.gif'><Button variant='primary'> <i className="fas fa-chart-line"></i>  NOAA Forecast </Button></a>
                <DetailsChart wave={wave} />
                <DetailsTable wave={wave} />
                </div>
            </div>
            )}
        </div>
    )
}

export default DetailScreen
