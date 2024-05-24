import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, MenuItem } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Buyerdashboard from '../buyer/buyer';
import { HOST_URL } from "../../../Constants";
function Login(){
    const history=useNavigate();
    const [errors,setErrors]=useState({});
    const [user, setuser] = useState({
        email: '',
        password:''
    })

    const changeHandler = e => {
        setuser({...user, [e.target.name]: e.target.value})
     }
   
     const validate = (fieldValues = user) => {
        let temp = { ...errors };

        if ("email" in fieldValues) {
          temp.email= 
          fieldValues.email === "" ? "Email is required" : "";
        }
        if ("password" in fieldValues) {
          temp.password=
            fieldValues.password === "" ? "password is required" : "";
        }
        setErrors({
          ...temp,
        });
       
        return Object.values(temp).every((x) => x === "");
      };

      const onsubmit = async(e) => {
            if(validate()) {
                  try {
                      const response =  await axios.post(`${HOST_URL}/login`, {
                      User:user
                    })

                    if(response.status==200){
               
                        var id=response.data.data[0].id;
                        var type=response.data.data[0].type;
                    
                        if(type=="Seller"){
                            history(`/Sellerdashboard/${id}`);
                        }

                        else if(type=="Buyer"){
                        
                            history(`/buyerdashboard/${id}`);
                         }
                  }
                } 
                 catch (error) {
                      console.log(error);
                  }
            }
          else{
            console.log(errors);
          }
       }
   
  return(
      <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'} style={{border: "2px solid red"}}>
        
        <Grid container xs={9} md={4} spacing={3} width={'40%'} style={{border: '1px solid black',padding:'1rem'}}  justifyContent={'center'} alignItems={'center'}>  
              <Grid item xs={12} style={{textAlign:'center',color:'black'}}>
                <h2>LOGIN</h2>
              </Grid>
              <Grid item xs={8} md={9}>
                <TextField
                        fullWidth
                        xs={12}
                        md={12}
                        value={user.email}
                        onChange={changeHandler}
                        variant="outlined"
                        name="email"
                        label="email"
                        {...(errors.email && {
                          error: true,
                          helperText: errors.email,
                      })}
                />
              </Grid>
              
              <Grid item xs={8} md={9} >
                <TextField
                        fullWidth
                        required
                        value={user.password}
                        onChange={changeHandler}
                        variant="outlined"
                        name="password"
                        label="password"
                        {...(errors.password && {
                          error: true,
                          helperText: errors.password,
                      })}
                />
                </Grid>
            
              <Button style={{width:'30%',margin:'1rem auto'}}  color='success'  onClick={onsubmit}>Submit</Button>
        </Grid> 
      </Grid>
  )
}


  
export default Login;