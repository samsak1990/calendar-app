import React from 'react'
import style from '../../assets/styles/WrapperContent/WrapperContent.module.css'
import Calendar from '../Calendar/Calendar'

export default function WrapperContent() {
  return (
    <div className={style.wrapperContent}>
      <Calendar />
    </div>
  )
}
