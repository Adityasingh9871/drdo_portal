import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import axios from "axios"

export default function Result() {

    const [searchresult, setsearchresult] = useState([{}])


    const get_serach_result=()=>{
        axios.get(`http://localhost:3001/data`)
          .then(res => {
            const data = res.data;
            
            setsearchresult(data)
            console.log(searchresult)
          })
    }

    return (
        <div>
            <div className={style.container} onClick={get_serach_result}></div>
        </div>
    )
}
