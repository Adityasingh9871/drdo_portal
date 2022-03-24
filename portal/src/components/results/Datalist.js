import React from 'react'
import style from './styling.module.css'

export default function Datalist(props) {

    if(props.title==='none')
    var title=<div>No Title Available</div>
    else
    title=<div>{props.title}</div>

    return (
        <div>
            <div className={style.databox1}>
                <div className={style.databox2}>
                    <a href={props.url}>{title}</a>
                </div>
                <div className={style.databox3}>{"Author : "+props.author}  || {"Year : "+props.year}  ||  {"Publication : "+props.publication}</div>
            </div>
        </div>
    )
}
