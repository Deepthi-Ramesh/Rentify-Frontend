
import { Button, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleCard from "../card/card";
import axios from "axios";
import { common } from "@mui/material/colors";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { HOST_URL } from "../../Constants";

function  Sellerdashboard(props){
    const history=useNavigate();
    let {userid}=useParams();
    const[isload,setisload]=useState(true);
    const [properties,setproperties]=useState({});
    //console.log(userid);

   //  useEffect(()=>{
   //    if(isload){
   //     fetchproperty();
   //     setisload(false);
   //    }
   //  },[isload]);
   
    const fetchproperty = async() => {
      try {
        const response =  await axios.get(`${HOST_URL}/fetchproperties/${userid}`, {
        })

          setproperties(response?.data?.data);
          /// isload(true);
          
      } catch (error) {
          console.log(error);
      }
    };
    useEffect(()=>{
      fetchproperty();
    },[]);
    return(
     <div className="seller">
        <p>Seller Dashboard </p>
        <p >Hi name {userid}</p>
        <Button onClick={()=>{ history(`/carddetails/${userid}`)}}style={{width:"15rem" , height:"3rem",backgroundColor:"rgb(8, 119 , 194)",color:"white",fontSize:"1rem" ,marginRight:'1rem', float:"right"}}><AddIcon style={{margin:"0 1rem"}}/> Add a Property</Button>
        <Grid container  style={{width:'100%',height:'30rem',justifyContent:"flex-start",alignItems:'center',flexDirection:'row',padding:'1rem 2rem'}}>
        {properties?.length > 0 && properties.map((property)=>(
        <div>
          <SingleCard property={property} type={"seller"} />
      </div>))}
        </Grid>       
                                                         
        
        
         
       
        
       
     </div>
    )
}
export default Sellerdashboard;