import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardDetails from "./cardDetails";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function SingleCard({property,type,id}){

  

  const [clicked,setclicked]=useState(false);
  const [sellerclicked,setsellerclicked]=useState(false);
  const[sellerdetails,setsellerdetails]=useState({});
  const [open, setOpen] = useState(false);
  const [openinterested, setOpeninterested] = useState(false);
  const [livelikes,setlivelikes]=useState(property.likes);
 

  const updateproperty = async(id) =>{
    try{
       setclicked(true);
       setOpen(true)

   } catch(error){
      console.log(error);
    }
  }

  const deleteproperty = async(id) =>{
    try{
       const response=await axios.post("http://localhost:5000/deleteproperty",{
          id:id
       })
       if(response.status==200){
             console.log(response.data.message);
       }
    
   } catch(error){
      console.log(error);
    }
  }

  const handletwofunction =(id)=>{
    getsellerdetails(id);
    sendmaildetails();
  }
  const getsellerdetails = async(id) =>{
    try{
       setsellerclicked(true);
       setOpeninterested(true)
       const response=await axios.get(`http://localhost:5000/getsellerdetails/${id}`,{
       })
       if(response.status==200){
             setsellerdetails(response?.data?.data[0]);
       }
    
   } catch(error){
      console.log(error);
    }
  }

  const  sendmaildetails = () =>{
    try{
       const response= axios.post(`http://localhost:5000/sendmaildeatils`,{
        id:id,
        sellerdetails:sellerdetails
        
       })
       if(response.status==200){
             setsellerdetails(response?.data?.data[0]);
       }
    
   } catch(error){
      console.log(error);
    }
  }

  const liketheproperty = async(id) =>{
    try{
        
       const response=await axios.post(`http://localhost:5000/liketheproperty`,{
        id:id
       })
       if(response.status==200){
             setlivelikes(property.likes+1);
       }
    
   } catch(error){
      console.log(error);
    }
  }
  const handleClose = () => {
    setOpen(false);
    setOpeninterested(false);
  };   
    

  JSON.stringify(sellerdetails);
      
     
return(

    <div>

      {clicked ? 
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Update Property Details
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <CardDetails propertyprops={property} onclose={handleClose} />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                
                </DialogActions> 
              </Dialog>
        : ""}


            {sellerclicked ? 
              <Dialog
                open={openinterested}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                <div> Seller Details</div>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                        Name: {sellerdetails.name}
                        <br/>
                        Email: {sellerdetails.email}
                        <br/>
                        Phone: {sellerdetails.phoneno}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                
                </DialogActions> 
              </Dialog>
        : ""}
          <Grid item style={{width:'30rem',height:'100%',border:'1px solid black'}}>
                <img src="/rent.jpeg" alt="" style={{width:'100%',height:'50%'}}/> 
                <div style={{display:"flex",flexDirection:"column",padding:'1rem'}}>
                <h2>{property.description} at {property.area}</h2>
                <p>Address:-{property.address} , {property.area}</p>
                <p>Location :-{property.location}</p>
                <p>Number of Bedrooms :-{property.noofbeadrooms}</p>
                <p>Number of Bathrooms :- {property.noofbathrooms}</p>
                <p>Number of colleges :-{property.noofcolleges}</p>
                <p>Number of hospitals :-{property.noofhospital}</p>
                {(type=="seller") ? 
                <div> 
                  <Button onClick={() => updateproperty(property.property_id)}>UPDATE</Button>
                <Button onClick={()=>{deleteproperty(property.property_id)}}>DELETE</Button></div>
                :
                <div> <Button onClick={()=>{handletwofunction(property.property_id)}}>IM INTERESTED</Button>
                <Button onClick={()=>{liketheproperty(property.property_id)}}><FavoriteOutlinedIcon color="error" /><p style={{marginLeft:'1rem'}}>{livelikes}</p></Button></div>}

                </div>
              
          </Grid>

          </div>
    )
}
export default SingleCard;
