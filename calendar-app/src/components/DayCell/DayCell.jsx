import React from 'react'
import style from '../../assets/styles/DayCell/DayCell.module.css'

export default function DayCell({ date, eventsCount, currentMonth, setSelectedDate, isSelectedDate }) {
    const dayClass = `${style.calendar__day} 
                ${isSelectedDate(date) ? style.today : ''} 
                ${date.getMonth() !== currentMonth.getMonth() ? style.shadow : ''}
                ${eventsCount < 8 ? style[`task_${eventsCount}`]: style.task_8}`;

    return (
        <div className={dayClass} onClick={() => setSelectedDate(date)}>
            {date ? date.getDate() : ''}
        </div>
    )
}
