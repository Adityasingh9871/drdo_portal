import React from 'react'
import style from './styling.module.css'
import pdfdownload from '../../assets/pdfdownload.png'

export default function Datalist(props) {

    

    if(props.title==='none')
    var title=<div>No Title Available</div>
    else
    title=<div>{props.title}</div>

    if(props.pdflinks)
    var downloadbtn=<a href={props.pdflinks}><img className={style.pdfimg} src={pdfdownload} /></a>

    return (
        <div>
            <div className={style.databox1}>
                <div className={style.databox2}>
                    <a href={props.url}>{title}</a>
                </div>
                <div className={style.databox3}>{"Author : "+props.author}  || {"Year : "+props.year}  ||  {"Publication : "+props.publication} || {downloadbtn} </div>
            </div>
        </div>
    )
}
