import React from 'react'
import style from '../../assets/styles/Header/Header.module.css'
import Avatar from '../../assets/images/girl.png'

export default function Header({month, year, onPrevMonth, onNextMonth, handleTodayClick}) {

  return (
    <div className={style.header}>
      <div className={style.header__currentMonth}>{month} {year}</div>
      <div className={style.header__avatar}>
        <img src={Avatar} alt="User Avatar" />
      </div>
      <div className={style.header__controls}>
        <button className={`${style.header__controls__prev} ${style.header__controls__button}`} onClick={onPrevMonth}></button>
        <button className={`${style.header__controls__next} ${style.header__controls__button}`} onClick={onNextMonth}></button>
        <button className={`${style.header__controls__today}`} onClick={handleTodayClick}>Сегодня</button>
      </div>
    </div>
  )
}
