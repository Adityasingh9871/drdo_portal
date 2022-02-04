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
            <div className={style.container} >
                <div className={style.box1}>

                    <div className={style.searchbar}>
                        <input type="text" className={style.search} placeholder="Search.."/>
                        <div className={style.searchbtn} onClick={get_serach_result} >search</div>
                    </div>

                    <div className={style.results}>
                        {searchresult.map((data)=>(
                            <div key={data.id}>(title)={data.title}(author=){data.author}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
