import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import '../css/WaveCard.css'

const ReportScreen = ({ match }) => {
    const [reports, setReports] = useState({})

    useEffect(() => {
        const fetchReport = async () => {
            const { data }  = await axios.get(`/api/waves/${match.params.endPoint}`)
            console.log(data)
            setReports(data)

        }
        fetchReport()
    }, [match])

    return (
        <div className='py-2'>
            <Link className='btn btn-primary my-3 px-2' to={`/waveforecast/${reports.endPoint}`} >Analysis</Link>
            <Card className="report-card py-3 mx-3">
                <h1>{reports.city} Marine Forecast</h1>
                <h3>National Weather Service Marine Forecast</h3>
                {reports?.report?.map((report, index) =>
                    <div key={index}>
                        <h4>{report.header}</h4>
                        <p>{report.body}</p></div>)}
            </Card>
        </div>

    );
}

export default ReportScreen
