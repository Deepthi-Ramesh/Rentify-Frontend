
import { Button, Grid } from "@mui/material";
import React, { useEffect ,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleCard from "../card/card";
import axios from "axios";

function  Buyerdashboard(){

    const history=useNavigate();
    let {userid}=useParams();
    const [properties,setproperties]=useState([]);

    const [filters, setFilters] = useState({
      location: '',
      noofbedrooms: '',
    });

    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      setFilters({
        ...filters,
        [name]: value,
      });
    };
  
  
    const filteredProperties =async(e)=>{
      const filteredProperties = properties.filter((property) => {
        const matchesLocation = filters.location
          ? property.location.toLowerCase().includes(filters.location.toLowerCase())
          : true;
        const matchesBedrooms = filters.noofbedrooms ? property.noofbeadrooms === filters.noofbedrooms : true;
  
        return  matchesLocation && matchesBedrooms;
      });
  
      setproperties(filteredProperties);
    }
  
    const fetchproperty = async(e) => {
        try {
              const response =  await axios.get("http://localhost:5000/fetchpropertiesforbuyer", {
              })

              if(response.status==200){
                  setproperties(response?.data?.data);
                
              }

        } catch (error) {
            console.log(error);
        }
}
      useEffect(()=>{
        fetchproperty();
      },[]);


    return(
      <div className="buyer">
          <p>BUyer Dashboard </p>
          <div>
       

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </label>

        <label>
          Bedrooms:
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <Button color="error" onClick={()=>{filteredProperties()}}>Apply</Button>
      </div>

          <p >Hi name {userid}</p>
         
          <Grid container  style={{width:'100%',height:'30rem',justifyContent:"flex-start",alignItems:'center',flexDirection:'row',padding:'1rem 2rem'}}>
                {properties?.length > 0 && properties.map((property,index)=>(
                <div key={index}>
                  <SingleCard  property={property}  type={"buyer"} id={userid}/>
              </div>))}
          </Grid>       
   </div>
    )
}
export default Buyerdashboard;