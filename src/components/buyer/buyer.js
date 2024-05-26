
import { Button, Grid } from "@mui/material";
import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import SingleCard from "../card/card";
import axios from "axios";
import { HOST_URL } from "../../Constants";

function  Buyerdashboard(){
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
  
const applyFilters = () => {
      const filteredProperties = properties.filter(property => {
        const matchesLocation = !filters.location ||
          property.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesBedrooms = !filters.noofbedrooms ||
          property.noofbeadrooms === parseInt(filters.noofbedrooms);

        return matchesLocation && matchesBedrooms;
      });

      setFilters(filteredProperties);
};

    useEffect(() => {
      fetchproperty();
    }, []); 
  
    useEffect(() => {
      applyFilters();
    }, [properties, filters]);
  
    
    const fetchproperty = async(e) => {
        try {
              const response =  await axios.get(`${HOST_URL}/fetchpropertiesforbuyer`, {
              })
              if(response.status==200){
                  setproperties(response?.data?.data);
              }

        } 
        catch (error) {
            console.log(error);
        }
}
  

    return(
      <div className="buyer"style={{padding:'2rem'}}>

            <p xs={12}style={{fontSize:'2rem',marginLeft:'1rem'}}>Welcome Buyer !</p>
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
              <select name="type" value={filters.noofbedrooms} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
              </select>
            </label>
            <Button color="error" onClick={()=>{applyFilters()}}>Apply</Button>

        </div>
          <Grid container  style={{width:'100%',height:'30rem',justifyContent:"flex-start",alignItems:'center',flexDirection:'row',margin:'1rem 0'}}>
                    {properties?.length > 0 && properties.map((property,index)=>(
                    <div key={index}>
                      <SingleCard  property={property}  type={"buyer"} id={userid}/>
                  </div>))}
            </Grid>       
   </div>
    )
}
export default Buyerdashboard;