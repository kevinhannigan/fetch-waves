import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';

const DetailsChart = ({ wave }) => {

    const [yAxisValue, setYAxisValue] = useState('WaveHeight');

    const formatXAxis = (tickItem) => {
        let time = tickItem.substring(11, 16)
        let hour = (time.split(':'))[0];
        let formathr = parseInt(hour, 10);
        let part = formathr >= 10 && formathr < 22 ? 'pm' : 'am';
        if (formathr >= 11 && formathr < 23) {
          return (`${formathr - 10}${part}`)
        } else if (formathr >= 23) {
          return (`${formathr - 22}${part}`)
        } else {
          return (`${formathr + 2}${part}`)
        }
      }

    return (
        <div>
            <div className="py-2 my-2">
                <Button className="btn-secondary" onClick={() => setYAxisValue('WaveHeight')}>
                    Wave Height
                </Button> {' '}
                <Button className="btn-secondary"  onClick={() => setYAxisValue('WavePeriod')}>
                    Wave Period
                </Button> {' '}
                <Button className="btn-secondary"  onClick={() => setYAxisValue('WindSpeed')}>
                    Wind Speed
                </Button> {' '}
            </div>
            <div style={{ width: '100%', height: 160 }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={wave.properties}
                            margin={{
                                top: 10, right: 10, left: 0, bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="validTime" tickFormatter={formatXAxis} interval={3} />
                            <YAxis type="number" />
                            <Tooltip />
                            <Area type="monotone" dataKey={yAxisValue} stroke="#5d99c6" fill="#c3fdff" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
        </div>
    )
}

export default DetailsChart
