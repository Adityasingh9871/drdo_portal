import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import About from '../about_us/About'
import axios from "axios"
import Datalist from './Datalist'
import ReactPaginate from 'react-paginate'
import {useLocation} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png'
import twitter from '../../assets/twitter.png'
import search from '../../assets/search.png'

//import { Document, Page,pdfjs } from 'react-pdf';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Result(props) {

    const location = useLocation();  //to access params from home.js

    const [searchresult, setsearchresult] = useState([{}])    //data set returned from db are stored here
    const [to_be_searched, setto_be_searched] = useState(location.state.item) //search key 
    const [counter_default, setcounter_default] = useState(0)  //page counter
    const [no_of_pages, setno_of_pages] = useState(0)          //total of pages
    const [newest_toggle, setnewest_toggle] = useState(false)  //filter
    const [oldest_toggle, setoldest_toggle] = useState(false)  //filter
    const [value1, setvalue1] = useState('1')
    const [currentItems, setcurrentItems] = useState([{}])
    const [pagecount, setpagecount] = useState(0)
    const [itemOffset, setitemOffset] = useState(0)
    const [endset, setendset] = useState(15)
    const [pages, setpages] = useState([])
    const [temppages, settemppages] = useState([])
    const [iserror, setiserror] = useState(1)

 

    const get_serach_result=()=>{             //function to fetch results and total pages from db

        
        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setsearchresult(data)
            if(res.data.length==0)
            setiserror(404)
            else
            setiserror(100)
            //console.log(searchresult)
          }).catch((err)=>{
            if(err.response.status==404)
            setiserror(404);
          })


        axios.get(`http://localhost:3001/total_pages`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setno_of_pages(Math.ceil(data[0].total/15))
          })

  


    }

    useEffect(()=>{

        axios.get(`http://localhost:3001/data`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data1 = res.data;
            setsearchresult(data1) 
          }).catch((err)=>{
              if(err.response.status==404)
              setiserror(404);
          })




        axios.get(`http://localhost:3001/total_pages`,{
            params:{item:to_be_searched}
        })
          .then(res => {
            const data = res.data;
            setno_of_pages(Math.ceil(data[0].total/15))
            //console.log("page here"+no_of_pages)
            for(let i=1;i<=no_of_pages;i++)
            settemppages(...temppages,i)
          })

        //console.log(searchresult)
  


          
    },[])


    useEffect(() => {
        console.log("Here: ", searchresult);
        setcurrentItems(searchresult.slice(itemOffset,endset))
    }, [searchresult,])

    useEffect(() => {
        
        console.log("temp="+temppages)
    }, [temppages])


    
    

    
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

    const sort_author=()=>{                 //filter
        setsearchresult(data=>[...data.sort((a,b)=>a.author.toLowerCase().localeCompare(b.author.toLowerCase()))])
        console.log("a-z")
        
    }

    const sort_publication=()=>{                 //filter
        setsearchresult(data=>[...data.sort((a,b)=>a.publication.toLowerCase().localeCompare(b.publication.toLowerCase()))])
        console.log("a-z")
        
    }

    const changepage=({selected})=>{                //function to get to the selected page
        //setcounter_default(selected*15)
         
        //setitemOffset(((selected)*15)%searchresult.length)    
        setitemOffset(((selected)*15)%searchresult.length)  
        console.log(selected)
        //setendset(itemOffset+15)
        
        console.log("start"+selected*15)
        console.log("end off set"+((selected+1)*15))
        setcurrentItems(searchresult.slice(selected*15,selected*15+15))
        console.log(currentItems)
        setpagecount(Math.ceil(searchresult.length/15))
        
         
     
    }

    const handle_key_press=(event)=>{
        if(event.key==="Enter")
        get_serach_result()  
    }
    
    const handleChange = (event, newValue) => {
        setvalue1(newValue)
    };

    if(iserror==404)
    {
       var errorDisplay=<div className={style.nothing}>Nothing found :(</div> 
       var pagination=<div></div>
    }
    
    else
    {
        var errorDisplay=currentItems.map((data)=>(<Datalist key={data.id} title={data.title} url={data.url} author={data.author} year={data.year} publication={data.publication} pdflinks={data.Pdf_Links} />))
        var pagination=<div>
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
    }

    

    return (
        <div >

            <div className={style.socialbox}>
                <img src={facebook} alt=' here' className={style.img1} />
                <img src={instagram} alt=' here' className={style.img1} />
                <img src={linkedin} alt=' here' className={style.img1} />
                <img src={twitter} alt=' here' className={style.img1} />
            </div>
           
            <TabContext value={value1}>
                
                <AppBar position="static">
                <TabList  onChange={handleChange} centered className={style.tablist} >
                    <Tab label="Result" value="1" />
                    <Tab label="About us" value="2" />
                    {/* <Tab label="Contact us" value="3" /> */}
                </TabList >
                </AppBar>
                
                <TabPanel value="1">

                    <div className={style.container} >
                        <div className={style.filter_box}>

                            <div>
                                <div className={style.sby1}>sort by year</div>
                                <li onClick={newest} className={style.i1}>newest</li>
                                <li onClick={oldest} className={style.i1}>oldest</li>
                                

                                <div className={style.sba1}>sort by title</div>
                                <li onClick={a_z} className={style.i1}>A-Z</li>
                                <li onClick={z_a} className={style.i1}>Z-A</li>

                                <div onClick={sort_author} className={style.sbauth}>sort by Author</div>
                                <div onClick={sort_publication} className={style.sbpubl}>sort by Publication House</div>
                            </div>
                        </div>


                        <div className={style.box1}>

                            <div className={style.searchbar}>
                                <input type="text" className={style.search} onChange={(e)=>setto_be_searched(e.target.value)} onKeyPress={(e)=>handle_key_press(e)} placeholder={to_be_searched}></input>
                                <img src={search} className={style.searchicon} onClick={get_serach_result} /> 
                                
                            </div>


                            <div className={style.results}>
                                {errorDisplay}
                            </div>

                            <div className={style.page_no_box}>

                                {pagination}
                              
                            </div>
                        </div>
                    </div>
                </TabPanel>

                
                <TabPanel value="2">
                    <About />
                </TabPanel>
                
                {/* <TabPanel value="3">
                    <div>contact us</div>
                </TabPanel> */}


                
               
            </TabContext>

      
            
        </div>
    )
}
