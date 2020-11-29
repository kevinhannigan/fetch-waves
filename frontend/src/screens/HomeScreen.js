import React, { useState, useEffect } from 'react'
import WaveSummary from '../components/WaveSummary'
import { Row, Container } from 'react-bootstrap'
import axios from 'axios'

const Homescreen = () => {
    const [waves, setWaves] = useState([])

    useEffect(() => {
        const fetchWaves = async () => {
            const { data } = await axios.get('/api/waves')
            
            setWaves(data)

        }
        fetchWaves()
    }, [])
    // array of dependencies is the second argument in useEffect
    return (
        <>
        <h1>Latest Conditions</h1>
        <Container className='mt-3' fluid>
        {waves.map(wave => (
            <Row key={wave.endPoint}>
                <WaveSummary waves={wave} />
            </Row>
            ))}
        </Container>    
        </> 
    )
}

export default Homescreen
