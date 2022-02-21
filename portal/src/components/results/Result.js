import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import axios from "axios"
import Datalist from './Datalist'
import ReactPaginate from 'react-paginate'
import Togglebtn from 'react-toggle-button'

export default function Result() {

    const [searchresult, setsearchresult] = useState([{}])
    const [to_be_searched, setto_be_searched] = useState('')
    const [counter_default, setcounter_default] = useState(0)
    const [no_of_pages, setno_of_pages] = useState(0)
    const [newest_toggle, setnewest_toggle] = useState(false)
    const [oldest_toggle, setoldest_toggle] = useState(false)

    const get_serach_result=()=>{
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

    useEffect(() => {
        axios.get(`http://localhost:3001/data_default`)
          .then(res => {
            const data1 = res.data;
            setsearchresult(data1)
            console.log(searchresult)
          })

          axios.get(`http://localhost:3001/total_pages_default`)
          .then(res => {
            const data2 = res.data;
            setno_of_pages(Math.ceil(data2[0].total/15))
            console.log("pages="+no_of_pages)
          })
    },[])

    const newest=()=>{
        
        setsearchresult(data=>[...data.sort((a,b)=>b.year-a.year)])
        console.log("newest")
        console.log(searchresult)
    }
    const oldest=()=>{
        
        setsearchresult(data=>[...data.sort((a,b)=>a.year-b.year)])
        console.log("oldest")
        console.log(searchresult)
    }

    const a_z=()=>{
        setsearchresult(data=>[...data.sort((a,b)=>a.title.toLowerCase().localeCompare(b.title.toLowerCase()))])
        console.log("a-z")
        
    }
    const z_a=()=>{
        setsearchresult(data=>[...data.sort((a,b)=>b.title.toLowerCase().localeCompare(a.title.toLowerCase()))])
        console.log("z-a")
       
    }

    const changepage=({selected})=>{
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
                        <input type="text" className={style.search} onChange={(e)=>setto_be_searched(e.target.value)} onKeyPress={(e)=>handle_key_press(e)} placeholder="Search.."/>
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
