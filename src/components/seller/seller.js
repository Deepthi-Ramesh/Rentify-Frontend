import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleCard from "../card/card";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { HOST_URL } from "../../Constants";

function  Sellerdashboard(){
  
    const history=useNavigate();
    let {userid}=useParams();
    const [properties,setproperties]=useState({});

    const fetchproperty = async() => {
          try {
                const response =  await axios.get(`${HOST_URL}/fetchproperties/${userid}`, {
                })

                setproperties(response?.data?.data);
          }
           catch (error) {
              console.log(error);
          }
      };

    useEffect(()=>{
      fetchproperty();
    },[]);

    return(
     <div className="seller" style={{padding:'2rem'}}>
              <p style={{fontSize:'2rem',marginLeft:'1rem'}}>Welcome Seller !</p>
              <Button onClick={()=>{ history(`/carddetails/${userid}`)}}style={{width:"15rem" , height:"3rem",backgroundColor:"rgb(8, 119 , 194)",color:"white",fontSize:"1rem" ,marginRight:'1rem', float:"right"}}><AddIcon style={{margin:"0 1rem"}}/> Add a Property</Button>
              <Grid container  style={{width:'100%',height:'30rem',justifyContent:"flex-start",alignItems:'center',flexDirection:'row'}}>
                  {properties?.length > 0 && properties.map((property)=>(
                  <div>
                    <SingleCard property={property} type={"seller"} />
                </div>))}
              </Grid>       
       
     </div>
    )
}
export default Sellerdashboard;