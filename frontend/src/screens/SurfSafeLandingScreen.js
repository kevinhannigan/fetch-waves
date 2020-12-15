import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import axios from 'axios'

const todaysDate = (new Date()).toISOString().split('T')[0]
const year = todaysDate.split('-')[0]
const month = todaysDate.split('-')[1]
const day = todaysDate.split('-')[2]

const SurfSafeLandingScreen = ({ match }) => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            const { data } = await axios.get('/api/locations')
            
            setLocations(data)

        }
        fetchLocations()
    }, [])
    // array of dependencies is the second argument in useEffect
    return (
        <div>
            <div>
                <h1>Surf Safe Locations</h1>
            </div>
            <div>
            {locations.map((location, idx) => (
            <div key={idx}>
                <div>
                    <h3>{location.endPoint}</h3>
                </div>
                <div>
                    <ul>
                        {location.locations.map((x, index) => (
                            <div key={index}>
                            <li>
                                <Link to={`/surfsafe/${location.endPoint}/${x}/${year}/${month}/${day}`} exact="true">
                                <Badge className="badge-locations badge-pill">{x}{' '}</Badge>{' '}</Link>
                            </li>
                            </div>))}
                    </ul>
                </div>
            </div>
            ))}
        </div>  
        </div> 
    )
}

export default SurfSafeLandingScreen
