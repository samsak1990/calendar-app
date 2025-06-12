import React from 'react'
import style from '../../assets/styles/EventsList/EventsList.module.css'
import {getMonthGenitiveName} from '../../utils/getMonthGenitiveName'
import EventSoon from '../../UI/EventSoon/EventSoon';
      

export default function EventsList({ selectedDate, eventsList, loading }) {
    const monthName = selectedDate ? getMonthGenitiveName(selectedDate.getMonth()) : '';
    return (
        <div className={style.eventsList}>
        <h2 className={style.eventsList__title}>{selectedDate.getDate() + ' ' + monthName}</h2>
            {loading ? <div className={style.loading}>Загрузка...</div> : eventsList.length === 0 ? 
            <p className={style.eventsList__empty}>Сегодня событий нет</p>:''
            }
        <ul className={style.eventsList__list}>
            {eventsList.length > 0 && eventsList.map((event, index) => {
                const now = new Date();
                const eventOnTime = new Date(event.reminder_on_datetime);
                const eventHours = String(eventOnTime.getHours()).padStart(2, '0');
                const eventMinutes = String(eventOnTime.getMinutes()).padStart(2, '0');
                const isEventSoon = eventOnTime.getTime() - now.getTime() < 3600000

                return (
                    <li key={index} className={style.eventsList__item}>
                        {isEventSoon ? <EventSoon/> : ''} 
                        <div className={style.eventsList__item_content}>
                            <span className={style.eventsList__item_task}>{event.reminder_text}</span>
                            <span className={style.eventsList__item_time}>{`${eventHours}:${eventMinutes}`}</span>
                        </div>
                    </li>
                );
            })}
        </ul>
        </div>
    )
}
