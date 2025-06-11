import React, { useEffect, useState } from 'react'
import style from '../../assets/styles/Calendar/Calendar.module.css'
import Header from '../Header/Header'
import { fetchReminders } from '../../utils/api';
import useDaysInMonth from '../../hooks/useDaysInMonth';
import { WEEKDAYS } from '../../data/constants';
import { API_URL, TOKEN, T_USER_ID } from '../../data/constants';

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [reminders, setReminders] = useState([]);
    const allDays = useDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const today = new Date();

    const handlePrevMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const handleNextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
    const handleTodayClick = () => {
        setCurrentMonth(new Date());
    };

    console.log(reminders)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const t_user_id = T_USER_ID;
                const token = TOKEN;
                if (t_user_id && token) {
                    const data = await fetchReminders(API_URL, T_USER_ID, TOKEN);
                    setReminders(data);
                }
            } catch (error) {
                console.error('Ошибка при загрузке напоминаний:', error);
            }
        };
        fetchData();
    }
    , [currentMonth]);

    const isToday = (date) => {
        return date && date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    };

    return (
        <div className={style.calendar}>
            <Header 
                month={currentMonth.toLocaleString('default', { month: 'long' })} 
                year={currentMonth.getFullYear()}  
                onPrevMonth={handlePrevMonth} 
                onNextMonth={handleNextMonth} 
                handleTodayClick={handleTodayClick}
            />
            <div className={style.calendar__weekdays}>
                {WEEKDAYS.map((day, index) => (
                    <div key={index} className={style.calendar__weekday}>{day}</div>
                ))}
            </div>
            <div className={style.calendar__days}>
                {allDays.map((date, index) => (
                    <div key={index} className={`${style.calendar__day} ${isToday(date) ? style.today : ''} ${date.getMonth() !== currentMonth.getMonth() ? style.shadow : ''}`}>
                        {date ? date.getDate() : ''}
                    </div>
                ))}
            </div>
        </div>
    )
}
