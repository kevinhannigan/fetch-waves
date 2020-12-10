import React from 'react'
import moment from 'moment'
import Calendar from '../components/Calendar'

var startOfWeek = moment();
var endOfWeek = moment().add(5, 'days');

var days = [];
var day = startOfWeek;

while (day <= endOfWeek) {
    days.push(day.toISOString().split('T')[0]);
    day = day.clone().add(1, 'd');
}

const Sandbox = () => {
    return (
        <div>
            {days.map((day, index) => 
            <Calendar date={day} /> )}
        </div>
    )
}

export default Sandbox
