import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import WaveArrow from './WaveArrow'

const WaveSummary = ({ waves }) => {
    return (
        <div className="summary-details">
            <Link to={`/waveforecast/${waves.endPoint}`} className="home">
            <div className="summary-location">
                <h4 className="detail-summary">{waves.city}{' '} </h4><br></br>
                <h5 className="detail-summary">View Details <i className="fas fa-chart-line"></i> </h5>
            </div>
            <div className="pt-2">
                <Row index={0} className="py-2">
                    <Col><i className="fas fa-water"></i></Col>
                    <Col><i className="fas fa-location-arrow"></i></Col>
                    <Col><i className="fas fa-wind"></i></Col>
                    <Col><i className="fas fa-location-arrow"></i></Col>
                </Row>
                <Row index={1}>
                    <Col>
                        Wave Height
                    </Col>
                    <Col>
                        Wave Direction
                    </Col>
                    <Col>
                        Wind Speed
                    </Col>
                    <Col>
                        Wind Direction
                    </Col>
                </Row>
                <Row index={2}>
                    <Col>
                        {waves.properties[0].WaveHeight} ft
                    </Col>
                    <Col>
                        <WaveArrow direction={waves.properties[0].WaveDirection + 180} />
                    </Col>
                    <Col>
                        {waves.properties[0].WindSpeed} mph
                    </Col>
                    <Col>
                        <WaveArrow direction={waves.properties[0].WindDirection + 180} />
                    </Col>
                </Row>
            </div>
            </Link>
        </div>
    )
}

export default WaveSummary
