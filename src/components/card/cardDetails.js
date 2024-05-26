import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HOST_URL } from "../../Constants";

function CardDetails({propertyprops}){

    const history = useNavigate();
    const [errors,setErrors]=useState({});
    let {userid}=useParams();

    const [property, setproperty] = useState({
        id:'',
        address:'',
        area: '',
        location: '',
        description:'',
        noofbathrooms: '',
        noofbeadrooms:'',
        noofcolleges:'',
        noofhospitals:''
        
    })

    const changeHandler = e => {
        setproperty({...property, [e.target.name]: e.target.value})
     } 

     useEffect(()=>{
      if(propertyprops){
        setproperty(propertyprops);
      }
    },[])

     property.id=userid;
  
     const validate = (fieldValues = property) => {
            let temp = { ...errors };
            if ("address" in fieldValues) {
              temp.name =
                fieldValues.address === "" ? " Name is required" : "";
            }
            if ("area" in fieldValues) {
                temp.name =
                  fieldValues.area === "" ? " Name is required" : "";
              }
        
            if ("location" in fieldValues) {
              temp.location= 
              fieldValues.location === "" ? "location is required" : "";
            }
                  if ("noofbeadrooms" in fieldValues) {
                    temp.noofbeadrooms=
                      fieldValues.noofbeadrooms === ""
                      ? "noofbedrooms is required" 
                      :"";
                  }
            if ("noofhospitals" in fieldValues) {
              temp.noofhospitals=
                fieldValues.noofhospitals === "" ? " noofhospitals is required" : "";
            }
            if ("noofcolleges" in fieldValues) {
              temp.noofcolleges=
                fieldValues.noofcolleges === "" ? " noofcolleges is required" : "";
            }
            if ("noofbathrooms" in fieldValues) {
              temp.noofcolleges=
                fieldValues.noofcolleges === "" ? " noofbathrooms is required" : "";
            }
            if ("description" in fieldValues) {
              temp.description=
                fieldValues.description === "" ? "description is required" : "";
            }
        setErrors({
          ...temp,
        });
    

        return Object.values(temp).every((x) => x === "");
      };
    
      const onsubmit = async(e) => {
        if(validate()) {
                  try {
                    const response =  await axios.post(`${HOST_URL}/addproperty`, {
                    Property:property
                    })
                    if(response.status==200){
                      console.log(response)
                      history(`/Sellerdashboard/${userid}`);
                    }
                    
                  } catch (error) {
                      console.log(error);
                  }
                    }
           
       }
       const updateproperty = async(e) =>{
            try{
                if(validate()){
                  const response=await axios.put(`${HOST_URL}/updateproperty`,{
                      property:property
                    } 
                )}
          } catch(error){
              console.log(error);
            }
      }
   
  return( 
        <Grid container xs={12} md={12} spacing={3}  style={{border: '1px solid black',padding:'2rem',width:'100%'}}>  
              <Grid item xs={12} style={{textAlign:'center',color:'black'}}>
                <h2>PROPERTY DETAILS</h2>
              </Grid>
                <Grid item xs={6} md={6} >
                    <TextField
                            fullWidth
                            required
                            value={property.address}
                            onChange={changeHandler}
                            variant="outlined"
                            name="address"
                            id="outlined-basic" 
                            label=" address"
                            {...(errors.address && {
                                error: true,
                                helperText: errors.address,
                            })}
                    />
                </Grid>
                <Grid item xs={6} >
                    <TextField
                          fullWidth
                            required
                            value={property.area}
                            onChange={changeHandler}
                            variant="outlined"
                            name="area"
                            id="outlined-basic" 
                            label="area"
                            {...(errors.area && {
                                error: true,
                                helperText: errors.area,
                            })}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                          fullWidth
                          xs={12}
                          md={12}
                          value={property.location}
                          onChange={changeHandler}
                          variant="outlined"
                          name="location"
                          label="location"
                          {...(errors.location && {
                            error: true,
                            helperText: errors.location,
                        })}
                  />
                </Grid>
                
                <Grid item xs={12}md={6}>
                <TextField
                        fullWidth
                        required
                        value={property.noofbeadrooms}
                        onChange={changeHandler}
                        variant="outlined"
                        name="noofbeadrooms"    
                        noofhospitals="text"
                        label="noofbeadrooms"
                        {...(errors.noofbeadrooms && {
                          error: true,
                          helperText: errors.noofbeadrooms,
                      })}
                />
                </Grid>
          
                <Grid item xs={12} md={6} >
                <TextField
                  fullWidth
                        required
                        value={property.noofhospitals}
                        onChange={changeHandler}
                        variant="outlined"
                        name="noofhospitals"
                        label="noofhospitals"
                        {...(errors.noofhospitals && {
                          error: true,
                          helperText: errors.noofhospitals,
                      })}
                />
                </Grid>
                <Grid item xs={12} md={6} >
                  <TextField
                          fullWidth
                          required
                          value={property.noofcolleges}
                          onChange={changeHandler}
                          variant="outlined"
                          name="noofcolleges"
                          label="noofcolleges"
                          {...(errors.noofcolleges && {
                            error: true,
                            helperText: errors.noofcolleges,
                        })}
                  />
                  </Grid>
                     <Grid item xs={12} md={6} >
                  <TextField
                          fullWidth
                          required
                          value={property.noofbathrooms}
                          onChange={changeHandler}
                          variant="outlined"
                          name="noofbathrooms"
                          label="noofbathrooms"
                          {...(errors.noofbathrooms && {
                            error: true,
                            helperText: errors.noofbathrooms,
                        })}
                  />
                  </Grid>
                  <Grid item xs={12} md={6} >
                  <TextField
                        fullWidth
                          required
                          value={property.description}
                          onChange={changeHandler}
                          variant="outlined"
                          name="description"
                          label="description"
                          {...(errors.description && {
                            error: true,
                            helperText: errors.description,
                        })}
                  />
                  </Grid>
              {propertyprops
              ? <Button style={{width:'30%',margin:'2rem auto'}}  color='success'  onClick={()=>{updateproperty()}}>Update</Button> 
              :<Button style={{width:'30%',margin:'2rem auto'}}  color='success'  onClick={()=>{onsubmit()}}>Submit</Button>}
      
        </Grid> 
  
  )
}


  
export default CardDetails;