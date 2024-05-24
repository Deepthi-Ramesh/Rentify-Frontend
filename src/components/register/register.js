import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, MenuItem } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { HOST_URL } from "../../../Constants";

function Register(){
    const history=useNavigate();
    const  [snackbar,setsnackbar]=useState(false);
    const [errors,setErrors]=useState({});
    const [user, setuser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneno: '',
        type:'',
        password:'',
        confirm_password:''
    })

  
    const changeHandler = e => {
        setuser({...user, [e.target.name]: e.target.value})
     }

   
     const validate = (fieldValues = user) => {

        let temp = { ...errors };

        if ("firstname" in fieldValues) {
          temp.name =
            fieldValues.firstname === "" ? " Name is required" : "";
        }

        if ("lastname" in fieldValues) {
            temp.name =
              fieldValues.lastname === "" ? " Name is required" : "";
          }
    
        if ("email" in fieldValues) {
          temp.email= 
          fieldValues.email === "" ? "Email is required" : "";
        }

        if ("phoneno" in fieldValues) {
                temp.phoneno=
                  fieldValues.phoneno === ""
                   ? "Mobile Number is required" 
                   :  /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(fieldValues.phoneno)
                   ?""
                   :"Invalid Number";
          }

        if ("type" in fieldValues) {
          temp.type=
            fieldValues.type === "" ? "Type is required" : "";
        }

        if ("password" in fieldValues) {
          temp.password=
            fieldValues.password === "" ? "password is required" : "";
        }

        if ("confirm_password" in fieldValues) {
          temp.confirm_password=
            fieldValues.confirm_password === "" ? "confirm_password is required" : "";
        }

        if ("confirm_password" in fieldValues !="password" in fieldValues) {
          temp.confirm_password=
            fieldValues.confirm_password === "" ? "confirm_password is not matched " : "";
        }

        setErrors({
          ...temp,
        });

       
        return Object.values(temp).every((x) => x === "");
      };

  const onsubmit = async(e) => {
        if(validate()) {
              user.firstname=user.firstname +' '+user.lastname;
              try {
                var url =`${HOST_URL}/app`;
                const response = await axios.post(
                url,{
                  User:user
                })

                if(response.status==200){
                    console.log("Inserted successfully");
                    history("/login");
                }
          }
          catch (error) {
                      var msg=error.response.data.message;
                      if(msg.includes('email')){
                        window.alert("email already exists");
                      }
                      else if(msg.includes('phoneno')){
                        window.alert("mobile no already exists");
                      }
                  }

        }
        else{
            console.log("not validate");
          }
           
       }
   
  return(
      <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'} style={{border: "2px solid red"}}>
          {snackbar?<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            This is a success Alert inside a Snackbar!
          </Alert>
        </Snackbar>:""}
  
        <Grid container xs={12} md={5} spacing={3} style={{border: '1px solid black',padding:'2rem'}}>  
            <Grid item xs={12} style={{textAlign:'center',color:'black'}}>
              <h2>REGISTER</h2>
            </Grid>
            <Grid item xs={6} md={6} >
                <TextField
                         fullWidth
                        required
                        value={user.firstname}
                        onChange={changeHandler}
                        variant="outlined"
                        name="firstname"
                        id="outlined-basic" 
                        label="firstname"
                        {...(errors.firstname && {
                            error: true,
                            helperText: errors.firstname,
                        })}
                />
            </Grid>
            <Grid item xs={6} >
                <TextField
                       fullWidth
                        required
                        value={user.lastname}
                        onChange={changeHandler}
                        variant="outlined"
                        name="lastname"
                        id="outlined-basic" 
                        label="lastname"
                        {...(errors.lastname && {
                            error: true,
                            helperText: errors.lastname,
                        })}
                />
            </Grid>
            <Grid item xs={12} md={12}>
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
  
            <Grid item xs={12}md={6}>
            <TextField
                    fullWidth
                    value={user.phoneno}
                    onChange={changeHandler}
                    variant="outlined"
                    name="phoneno"    
                    type="text"
                    label="phoneno"
                    {...(errors.phoneno && {
                      error: true,
                      helperText: errors.phoneno,
                  })}
            />
            </Grid>
        
            <Grid item xs={12} md={6} >
            <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.type}
                    label="type"
                    name="type"
                    onChange={changeHandler}
                  >
                    <MenuItem value={"Buyer"}>Buyer</MenuItem>
                    <MenuItem value={"Seller"}>Seller</MenuItem>
                  
                  </Select>
                  </FormControl>
            </Grid>
            <Grid item xs={12} md={6} >
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
              <Grid item xs={12} md={6} >
              <TextField
                     fullWidth
                      required
                      value={user.confirm_password}
                      onChange={changeHandler}
                      variant="outlined"
                      name="confirm_password"
                      label="confirm_password"
                      {...(errors.confirm_password && {
                        error: true,
                        helperText: errors.confirm_password,
                    })}
              />
              </Grid>
            <Button style={{width:'30%',margin:'2rem auto'}}  color='success'  onClick={onsubmit}>Submit</Button>
        </Grid> 
      </Grid>
  )
}


  
export default Register;