import React from 'react'
import style from './landing.module.css'

export default function Recomend(props) {
    const setsearch=()=>{
        props.setsearch_param(props.title)
        console.log("set")
    }

    return (
        <div>
           <div className={style.recitem} onClick={()=>setsearch()}>{props.title}</div>
        </div>
    )
}
