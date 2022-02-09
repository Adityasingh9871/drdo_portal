import React from 'react'
import style from './styling.module.css'

export default function Datalist(props) {
    return (
        <div>
            <div className={style.databox1}>
                <div className={style.databox2}>
                    <a href={props.url}>{props.title}</a>
                </div>
                <div className={style.databox3}>{"Author : "+props.author}  || {"Year : "+props.year}  ||  {"Publication : "+props.publication}</div>
            </div>
        </div>
    )
}
