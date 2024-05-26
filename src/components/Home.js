const { Button } = require("@mui/material");
import { useNavigate } from "react-router-dom";

function Home(){
    const history = useNavigate();
    return(
        <div style={{margin:'15rem auto',width:'40%', color:'white',height:'20%', display:"flex",flexDirection:'column',justifyContent:"space-around",alignItems:"center"}}>
                <p>Welcome to Rentify</p>
                <p style={{fontSize:'1.5rem'}}>RENTIFY : Where Renting Meets Simplicity</p>
                <div style={{ width:'50%', display:"flex",flexDirection:'row',justifyContent:"space-around",alignItems:"center"}}>
                    <Button style={{backgroundColor:'red',color:'white'}} onClick={()=>{history('/register')}}>Register</Button>
                    <Button style={{backgroundColor:'red',color:'white'}} onClick={()=>{history('/login')}}>Login</Button>
                </div>
        </div>
    )
}
export default Home;