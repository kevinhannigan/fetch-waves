import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge } from 'react-bootstrap'
import WaveArrow from './WaveArrow'

const DetailsCards = ({ wave }) => {
    return (
        <div>
            <div className='row flex-row flex-nowrap overflow-auto px-3'>
                <Card className='card-style text-white bg-primary mb-3'>
                    <Card.Body>
                        <Card.Title><i className='fas fa-water'></i></Card.Title>
                        <Card.Subtitle>Wave Height</Card.Subtitle>
                        <Card.Text>
                            {wave?.properties?.[0]?.WaveHeight} ft
                        </Card.Text>
                        <Card.Subtitle>Wave Direction</Card.Subtitle>
                        <Card.Text>
                            <WaveArrow direction={wave?.properties?.[0]?.WaveDirection + 180} />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='card-style text-white bg-primary mb-3'>
                    <Card.Body>
                        <Card.Title><i className='fas fa-stopwatch'></i></Card.Title>
                        <Card.Subtitle>Wave Period</Card.Subtitle>
                        <Card.Text>
                            {wave?.properties?.[0]?.WavePeriod}s
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='card-style text-white bg-primary mb-3'>
                    <Card.Body>
                        <Card.Title><i className='fas fa-wind'></i></Card.Title>
                        <Card.Subtitle>Wind Speed</Card.Subtitle>
                        <Card.Text>
                            {wave?.properties?.[0]?.WindSpeed} mph
                        </Card.Text>
                        <Card.Subtitle>Wind Direction</Card.Subtitle>
                        <Card.Text>
                            <WaveArrow direction={wave?.properties?.[0]?.WindDirection + 180} />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='card-style text-white bg-primary mb-3'>
                    <Card.Body>
                        <Card.Title><i className="fas fa-cloud-showers-heavy"></i></Card.Title>
                        <Card.Subtitle>Chance of Rain</Card.Subtitle>
                        <Card.Text>
                            {wave?.properties?.[0]?.ChanceRain}%
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card className='card-style text-white bg-primary mb-3'>
                    <Card.Body>
                        <Card.Title><i className='fas fa-thermometer-half'></i></Card.Title>
                        <Card.Subtitle>Air Temperature</Card.Subtitle>
                        <Card.Text>
                            {wave?.properties?.[0]?.Temperature} F
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='card-style text-white bg-primary mb-3'>
                    <Card.Body>
                        <Card.Title><i className='fas fa-snowflake'></i></Card.Title>
                        <Card.Subtitle className="text-center">Water Temperature</Card.Subtitle>
                        <Card.Text>
                            {wave.watertemp} F
                            </Card.Text>
                        <Card.Text>
                            <Link to={'/wetsuitguide'}>
                                <Badge className="badge badge-pill badge-secondary">Wetsuit Guide</Badge>
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default DetailsCards
