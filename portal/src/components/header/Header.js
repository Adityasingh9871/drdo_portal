import React from 'react'
import style from './styling.module.css'

export default function Header() {
    return (
        <div>
            <div className={style.container}>
                <div className={style.logo}>
                    <div className={style.tag1}>portal</div>
                </div>
                <div className={style.searchbar}>
                    <input type="text" className={style.search} placeholder="Search.."/>
                    <div className={style.searchbtn}>search</div>
                </div>
            </div>
        </div>
    )
}
