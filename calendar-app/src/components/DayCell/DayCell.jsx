import React from 'react'
import style from '../../assets/styles/DayCell/DayCell.module.css'

export default function DayCell({ date, currentMonth, setSelectedDate, isSelectedDate }) {

    const dayClass = `${style.calendar__day} 
                ${isSelectedDate(date) ? style.today : ''} 
                ${date.getMonth() !== currentMonth.getMonth() ? style.shadow : ''}`;
    return (
        <div className={dayClass} onClick={() => setSelectedDate(date)}>
            {date ? date.getDate() : ''}
        </div>
    )
}
