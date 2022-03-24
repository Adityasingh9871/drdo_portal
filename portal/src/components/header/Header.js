import React from 'react'
import style from './styling.module.css'
import drdo_logo from '../../assets/drdologo.png'

export default function Header(props) {
    return (
        <div>
            <div className={style.container}>
                <img src={drdo_logo} className={style.logo} />
                <div className={style.title}>
                    <div className={style.tag1}>DRDO ARTICLES AND JOURNALS</div>
                </div>
            </div>
        </div>
    )
}
