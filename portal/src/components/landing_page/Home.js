import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios"
import Landing from './Landing'
import Recomend from './Recomend'
import style from './landing.module.css'
import img1 from '../../assets/img2.png'


export default function Home() {

    const [search_param, setsearch_param] = useState('')
    const [recomend, setrecomend] = useState([])
    const [focused, setfocused] = useState(false)

    const onfocus = () => setfocused(true);
    const onblur = () => setfocused(false);

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

    const change=async (event)=>{
        setsearch_param(event)

        axios.get(`http://localhost:3001/recomend`,{
            params:{item:event}
        })
          .then(res => {
            const data = res.data;
            setrecomend(data)
            console.log(data)
          })
            
    }

    if(recomend.length!=0 && focused==true )
    var rec=<div className={style.recomend}>{recomend.map(data=><Recomend setsearch_param={setsearch_param} title={data.title} />)}</div>

    useEffect(() => {
        console.log(recomend)
        
    }, [recomend])


    return (
        <div>
            
            <div className={style.searchbox}>
                <img src={img1} className={style.background} />
                <div>
                    <input type="search" placeholder="Search"  className={style.searchbar} onFocus={onfocus} onBlur={onblur} onChange={(event)=>change(event.target.value)} onKeyPress={(e)=>handle_key_press(e)}></input>
                    <button  className={style.searchbtn} onClick={routeChange} >GO</button>
                    
                        {rec}
                    
            
            </div>
            
            </div>
        </div>
    )
}
