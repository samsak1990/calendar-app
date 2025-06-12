import React, { useEffect, useState } from 'react'
import style from '../../assets/styles/Calendar/Calendar.module.css'
import Header from '../Header/Header'
import DayCell from '../DayCell/DayCell';
import useDaysInMonth from '../../hooks/useDaysInMonth';
import { fetchReminders } from '../../utils/api';
import { WEEKDAYS } from '../../data/constants';
import { API_URL, TOKEN, T_USER_ID } from '../../data/constants';
import EventsList from '../EventsList/EventsList';


export default function Calendar() {
    const today = new Date();
    // Состояния для управления календарем
    const [currentMonth, setCurrentMonth] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);
    // Состояния для управления напоминаниями
    const [loading, setLoading] = useState(false);
    const [reminders, setReminders] = useState([]);
    // Состояние для управления сворачиванием/разворачиванием недель
    const [isCollapsed, setIsCollapsed] = useState(false);

    const allDays = useDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    
    const handlePrevMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const handleNextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
    const handleTodayClick = () => {
        if (currentMonth.getFullYear() === selectedDate.getFullYear() && currentMonth.getMonth() === selectedDate.getMonth() && currentMonth.getDate() === selectedDate.getDate()) {
            return;
        }
        setSelectedDate(today);
        setCurrentMonth(today);
    };

    const isSelectedDate = (date) => {
        return date && selectedDate.getFullYear() === date.getFullYear() &&
           selectedDate.getMonth() === date.getMonth() &&
           selectedDate.getDate() === date.getDate();
    };

    const currentWeekIndex = Math.floor(
        allDays.findIndex(
            d => d && d.toDateString() === today.toDateString()
            ) / 7
        );
        
    const days = isCollapsed
        ? allDays.slice(currentWeekIndex * 7, currentWeekIndex * 7 + 7)
        : allDays;

    const remindersForSelectedDate = []

    for (const reminder in reminders.reminders) {
        if (!reminders.reminders[reminder].reminder_on_datetime) continue;
        if (!reminders.reminders[reminder].reminder_text) continue;

        const reminderDate = new Date(reminders.reminders[reminder].reminder_on_datetime)

        if (reminderDate.getFullYear() === selectedDate.getFullYear() &&
            reminderDate.getMonth() === selectedDate.getMonth() &&
            reminderDate.getDate() === selectedDate.getDate()) {
            remindersForSelectedDate.push(reminders.reminders[reminder]);
        }
    }

    useEffect(() => {
        // Функция для получения напоминаний
        const fetchData = async () => {
            setLoading(true);
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
            setLoading(false);
        };
        fetchData();
    }
    , [currentMonth]);



    return (
        <>
            <div className={`${style.calendar}  ${isCollapsed ? ` ${style.collapsed}` : ''}`}>
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
                    {days.map((date, index) => (
                        <DayCell key={index} date={date} currentMonth={currentMonth} setSelectedDate={setSelectedDate} isSelectedDate={isSelectedDate} />
                    ))}
                </div>
                <div className={style.toggleWeek} onClick={() => setIsCollapsed(prev => !prev)} role='button'>
                    {isCollapsed ?  '▾':'▴'}
                </div>
            </div>
            <EventsList selectedDate={selectedDate} loading={loading} eventsList={remindersForSelectedDate || []} />
        </>

    )
}
