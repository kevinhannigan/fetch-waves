import React, { useState, useEffect } from 'react'
import WaveSummary from '../components/WaveSummary'
import banner from '../images/banner.jpg'
import axios from 'axios'

const Homescreen = ({ match }) => {

    const keyword = match.params.keyword
    const queryParam = (keyword) ? keyword : ''

    const [waves, setWaves] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWaves = async () => {
            const { data } = await axios.get(`/api/waves?keyword=${queryParam}`)
            setWaves(data)
            setLoading(false)
        }
        fetchWaves()
    }, [queryParam])
    // array of dependencies is the second argument in useEffect
    return (
        <>
            <div className="home-container">
                <img className="home-image" src={banner}  alt="banner"/>
            </div>
            {loading ? (
                <div>
                    <h3>Fetching Waves 🌊 🌊 🌊.</h3>
                </div>) : (
                    <div className="home-conditions">
                        <h1 className="header-summary">Latest Conditions</h1>
                        <div className='home-tiles'>
                            {waves.map(wave => (
                                <div className="home-row" key={wave.endPoint}>
                                    <WaveSummary waves={wave} />
                                </div>
                            ))}
                        </div>
                    </div>)}
        </>
    )
}

export default Homescreen
