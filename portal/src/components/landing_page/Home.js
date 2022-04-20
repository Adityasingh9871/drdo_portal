import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import Landing from './Landing'
import style from './landing.module.css'

export default function Home() {

    const [search_param, setsearch_param] = useState('')
    let navigate = useNavigate(); 
    const routeChange = () =>
    { 
    let path = `landing`; 
    navigate('/landing',{state:{item:search_param}});
    }

    const handle_key_press=(event)=>{
        if(event.key==="Enter")
        routeChange()  
    }


    return (
        <div>
            <div className={style.searchbox}>
                <div>
                    <input type="search" placeholder="search"  className={style.searchbar} onChange={(e)=>setsearch_param(e.target.value)} onKeyPress={(e)=>handle_key_press(e)}></input>
                    <button  className={style.searchbtn} onClick={routeChange} >GO</button>
                </div>
            
            </div>
        </div>
    )
}
