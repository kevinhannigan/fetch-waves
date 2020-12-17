import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import axios from 'axios'

const todaysDate = (new Date()).toISOString().split('T')[0]
const year = todaysDate.split('-')[0]
const month = todaysDate.split('-')[1]
const day = todaysDate.split('-')[2]

const SurfSafeCityScreen = ({ match }) => {
    const [location, setLocation] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            const { data } = await axios.get(`/api/locations/${match.params.endPoint}`)
            setLocation(data)

        }
        fetchLocations()
    }, [match])
    // array of dependencies is the second argument in useEffect
    return (
        <div className="detail-container">
            <div>
                <h1>Surf Safe Locations</h1>
            </div>
            <div>
            <div>
                <div>
                    <Link className='btn btn-light my-3 px-2' to={`/waveforecast/${location?.endPoint}`} exact="true">Analysis</Link>
                </div>
                <div className='py-3'>
                    <h3>{location?.endPoint}</h3>
                </div>
                <div className='px-3'>
                     <ul>
                        {location?.locations?.map((x, index) => (
                            <div className = "px-1 py-1 surfsafe-badges" key={index}>
                                <Link to={`/surfsafe/${location?.endPoint}/${x}/${year}/${month}/${day}`} exact="true">
                                <Badge className="badge-locations badge-pill">{x}</Badge></Link>
                            </div>))} 
                    </ul>
                </div>
            </div>
        </div>  
        </div> 
    )
}

export default SurfSafeCityScreen
