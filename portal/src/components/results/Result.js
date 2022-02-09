import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import axios from "axios"
import Datalist from './Datalist'

export default function Result() {

    const [searchresult, setsearchresult] = useState([{}])
    const [to_be_searched, setto_be_searched] = useState('')
    const [counter_default, setcounter_default] = useState(0)
    
    const get_serach_result=()=>{
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched,counter:counter_default}
        })
          .then(res => {
            const data = res.data;
            setsearchresult(data)
            console.log(searchresult)
          })
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/data_default`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setsearchresult(data)
            console.log(searchresult)
          })
    },[])

    const nextpage=()=>{
        setcounter_default(counter_default+15)
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched,counter:counter_default}
            
        })
          .then(res => {
            const data = res.data;
            setsearchresult(data)
            console.log(searchresult)
          })
    }
    const prevpage=()=>{
        if(counter_default>0)
        setcounter_default(counter_default-15)
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched,counter:counter_default}
            
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

                    <div className={style.page_no_box}>
                        <div className={style.pagebtn} onClick={prevpage}>Prev</div>
                        <div className={style.pagebtn} onClick={nextpage}>Next</div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}
