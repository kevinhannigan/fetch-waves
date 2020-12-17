import React from 'react'

const Calendar = ({ date, endPoint, location }) => {
    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]
    const url=`/surfsafe/${endPoint}/${location}/${year}/${month}/${day}`
    return (
        <a href={url}>
        <div className='py-3 calendar'>
            <i className="far fa-calendar"></i>
            <div>{date}</div>
        </div>
        </a>
    )
}

export default Calendar
