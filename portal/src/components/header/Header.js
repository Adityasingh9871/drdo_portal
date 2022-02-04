import React from 'react'
import style from './styling.module.css'

export default function Header(props) {
    return (
        <div>
            <div className={style.container}>
                <div className={style.logo}>
                    <div className={style.tag1}>portal</div>
                </div>
            </div>
        </div>
    )
}
