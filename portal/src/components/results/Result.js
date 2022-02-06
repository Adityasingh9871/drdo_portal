import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import axios from "axios"
import Datalist from './Datalist'

export default function Result() {

    const [searchresult, setsearchresult] = useState([{}])
    const [to_be_searched, setto_be_searched] = useState('')
    
    const get_serach_result=()=>{
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched}
        })
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
                        <input type="text" className={style.search} onChange={(e)=>setto_be_searched(e.target.value)} placeholder="Search.."/>
                        <div className={style.searchbtn} onClick={get_serach_result} >search</div>
                    </div>

                    <div className={style.results}>
                        {searchresult.map((data)=>(
                            <Datalist key={data.id} title={data.title} url={data.url} author={data.author} year={data.year} publication={data.publication} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
