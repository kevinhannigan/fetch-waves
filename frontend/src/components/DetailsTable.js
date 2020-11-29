import React from 'react'
import { Table } from 'react-bootstrap'
import WaveArrow from './WaveArrow'

const DetailsTable = ({ wave }) => {
    
    const timeConversion = (time) => {
        let hour = (time.split(':'))[0];
        let formathr = parseInt(hour, 10);
        let part = formathr >= 10 && formathr < 22 ? 'pm' : 'am';
        if (formathr >= 11 && formathr < 23) {
          return (`${formathr - 10} ${part}`)
        } else if (formathr >= 23) {
          return (`${formathr - 22} ${part}`)
        } else {
          return (`${formathr + 2} ${part}`)
        }
      }
    
    return (
        <div>
            <Table bordered hover className="table-light table-responsive">
                <thead class="thead-dark">
                    <tr>
                        <th className="min">Date</th>
                        {wave?.properties?.map((w, index) =>
                            <th className="min" key={index}>{w.validTime.substring(5, 10)}</th>)}
                    </tr>
                    <tr>
                        <th className="min">Time</th>
                        {wave?.properties?.map((w, index) =>
                            <th className="min" key={index}>{timeConversion(w.validTime.substring(11, 16))}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Wave Height (ft)</th>
                        {wave?.properties?.map((w, index) =>
                            <td className={w.WaveHeight > 2.5 ? "gcell" : "min"} key={index}>{w.WaveHeight}</td>)}
                    </tr>
                    <tr>
                        <th>Wave Period (s)</th>
                        {wave?.properties?.map((w, index) =>
                            <td className={w.WaveHeight >= 4.0 ? "gcell" : "min"} key={index}>{w.WavePeriod}</td>)}
                    </tr>
                    <tr>
                        <th>Wave Direction</th>
                        {wave?.properties?.map((w, index) =>
                            <td className="min" key={index}><WaveArrow direction={w.WaveDirection + 180} /></td>)}
                    </tr>
                    <tr>
                        <th>Wind Speed (mph)</th>
                        {wave?.properties?.map((w, index) =>
                            <td className="min" key={index}>{w.WindSpeed}</td>)}
                    </tr>
                    <tr>
                        <th>Wind Direction</th>
                        {wave?.properties?.map((w, index) =>
                            <td className="min" key={index}><WaveArrow direction={w.WindDirection + 180} /></td>)}
                    </tr>
                    <tr>
                        <th>Temperature (F)</th>
                        {wave?.properties?.map((w, index) =>
                            <td className="min" key={index}>{w.Temperature}</td>)}
                    </tr>
                    <tr>
                        <th>Precipitation %</th>
                        {wave?.properties?.map((w, index) =>
                            <td className="min" key={index}>{w.ChanceRain}</td>)}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DetailsTable
