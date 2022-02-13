import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import axios from "axios"
import Datalist from './Datalist'
import ReactPaginate from 'react-paginate'

export default function Result() {

    const [searchresult, setsearchresult] = useState([{}])
    const [to_be_searched, setto_be_searched] = useState('')
    const [counter_default, setcounter_default] = useState(0)
    const [no_of_pages, setno_of_pages] = useState(0)

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
        
        //searchresult.sort((a,b)=>a.year-b.year)
        setsearchresult(data=>[...data.sort((a,b)=>b.year-a.year)])
        console.log("newest")
        console.log(searchresult)
    }
    const oldest=()=>{
        
        setsearchresult(data=>[...data.sort((a,b)=>a.year-b.year)])

        console.log("oldest")
        console.log(searchresult)
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

    
    

    return (
        <div>
            <div className={style.container} >

                <div className={style.filter_box}>

                    <div>
                        <div>sort by year</div>
                        <div onClick={newest}>newest</div>
                        <div onClick={oldest}>oldest</div>
                    </div>
                </div>


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
