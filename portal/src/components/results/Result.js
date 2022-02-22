import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import axios from "axios"
import Datalist from './Datalist'
import ReactPaginate from 'react-paginate'
import Togglebtn from 'react-toggle-button'
import {useLocation} from 'react-router-dom';

export default function Result() {

    const location = useLocation();  //to access params from home.js

    const [searchresult, setsearchresult] = useState([{}])    //data set returned from db are stored here
    const [to_be_searched, setto_be_searched] = useState(location.state.item) //search key 
    const [counter_default, setcounter_default] = useState(0)  //page counter
    const [no_of_pages, setno_of_pages] = useState(0)          //total of pages
    const [newest_toggle, setnewest_toggle] = useState(false)  //filter
    const [oldest_toggle, setoldest_toggle] = useState(false)  //filter

    const get_serach_result=()=>{             //function to fetch results and total pages from db
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setsearchresult(data)
            console.log(searchresult)
          })


        axios.get(`http://localhost:3001/total_pages`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setno_of_pages(Math.ceil(data[0].total/15))
            console.log(no_of_pages)
          })



    }

    useEffect(() => {                                    //loads at starting time only once
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setsearchresult(data)
            console.log(searchresult)
          })


        axios.get(`http://localhost:3001/total_pages`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setno_of_pages(Math.ceil(data[0].total/15))
            console.log(no_of_pages)
          })
    },[])

    const newest=()=>{            //filter
        
        setsearchresult(data=>[...data.sort((a,b)=>b.year-a.year)])
        console.log("newest")
        console.log(searchresult)
    }
    const oldest=()=>{             //filter
        
        setsearchresult(data=>[...data.sort((a,b)=>a.year-b.year)])
        console.log("oldest")
        console.log(searchresult)
    }

    const a_z=()=>{                 //filter
        setsearchresult(data=>[...data.sort((a,b)=>a.title.toLowerCase().localeCompare(b.title.toLowerCase()))])
        console.log("a-z")
        
    }
    const z_a=()=>{                       //filter
        setsearchresult(data=>[...data.sort((a,b)=>b.title.toLowerCase().localeCompare(a.title.toLowerCase()))])
        console.log("z-a")
       
    }

    const changepage=({selected})=>{                //function to get to the selected page
        setcounter_default(selected*15)      
        axios.get(`http://localhost:3001/data2`,{
            params:{item:to_be_searched,counter:counter_default}
            
        })
          .then(res => {
            const data3 = res.data;
            setsearchresult(data3)
            console.log(searchresult)
          })
        console.log("selected="+selected)
    }

    const handle_key_press=(event)=>{
        if(event.key==="Enter")
        get_serach_result()  
    }
    
    

    return (
        <div>
            <div className={style.container} >
                <div className={style.filter_box}>

                    <div>
                        <div>sort by year</div>
                        <li onClick={newest}>newest<Togglebtn value={ newest_toggle || false } onToggle={(value) => {setnewest_toggle(!value) }} /></li>
                        <li onClick={oldest}>oldest<Togglebtn value={ oldest_toggle || false } onToggle={(value) => {setoldest_toggle(!value) }} /></li>
                        

                        <div>sort by alphabet</div>
                        <li onClick={a_z}>A-Z</li>
                        <li onClick={z_a}>Z-A</li>
                    </div>
                </div>


                <div className={style.box1}>

                    <div className={style.searchbar}>
                        <input type="text" className={style.search} onChange={(e)=>setto_be_searched(e.target.value)} onKeyPress={(e)=>handle_key_press(e)} placeholder={to_be_searched}/>
                        <div className={style.searchbtn} onClick={get_serach_result} >search</div>
                    </div>

                    <div className={style.results}>
                        {searchresult.map((data)=>(
                            <Datalist key={data.id} title={data.title} url={data.url} author={data.author} year={data.year} publication={data.publication} />
                        ))}
                    </div>

                    <div className={style.page_no_box}>

                    <ReactPaginate
                    breakLabel='...'
                    nextLabel="Next >"
                    previousLabel="< Prev"
                    pageCount={no_of_pages}
                    onPageChange={changepage}
                    containerClassName={style.paginationbtn}
                    previousLinkClassName={style.previousbtn}
                    nextLinkClassName={style.nextbtn}
                    disabledClassName={style.disable}
                    activeClassName={style.activebtn}
                    disableInitialCallback={false}
                    />

                    </div>
                </div>
            </div>
        </div>
    )
}
