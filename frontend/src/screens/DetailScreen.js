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

    useEffect(() => {
        const fetchWave = async () => {
            const { data }  = await axios.get(`/api/waves/${match.params.endPoint}`)
            console.log(data)
            
            
            setWave(data)

        }
        fetchWave()
    }, [match])

    const timeFormat = (time) => {
        let date = new Date(time)
        return(date.toString())
      }

    return (
        <div>

            <div className='py-2'>
                <Link className='btn btn-light my-3 px-2' to='/'> Back </Link> {' '}
                <Link className='btn btn-primary my-3 px-2' to={`/report/${wave.endPoint}`} > Report </Link>
                <h1>{wave.city}</h1>
                <h4>{timeFormat(wave.last_modified)}</h4>
            </div>
            <div>
                <DetailsCards wave={wave} />
            </div>
            <div>
            <h2 className='py-3'>36 Hour Forecast</h2>
            <a href='https://www.glerl.noaa.gov/res/glcfs/fcast/mwv.gif'><Button variant='primary'> <i className="fas fa-chart-line"></i>  NOAA Forecast </Button></a>
            <DetailsChart wave={wave} />
            <DetailsTable wave={wave}/>
            </div>
        </div>
    )
}

export default DetailScreen
