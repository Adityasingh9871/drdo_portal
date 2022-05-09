import React from 'react'
import style from './styling.module.css'
import drdo_logo from '../../assets/drdologo.png'
import {useNavigate} from "react-router-dom";

export default function Header(props) {

    let navigate = useNavigate(); 

    const routeChange = () =>
    { 
    let path = ``; 
    navigate('/');
    }
    return (
        <div>
            <div className={style.container}>
                <div className={style.logobox} >
                    <img src={drdo_logo} className={style.logo} onClick={routeChange} />
                </div>
                <div className={style.title}>    
                    <div className={style.tag1} onClick={routeChange}>DRDO ARTICLES AND JOURNALS</div>
                </div>
            </div>
        </div>
    )
}
