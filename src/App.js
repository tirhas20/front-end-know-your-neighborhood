import './App.css';
import BusinessForm from './components/BusinessForm'
import BusinessList from './components/BusinessList';
// import Business from './components/Business'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DropdownZipcode from './components/DropDownZipcode';
import DropDownCategory from './components/DropDownCategory';



export const URL = "https://know-your-neighborhood.herokuapp.com/";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedZipcode , setSelectedZipcode] = useState("")
  const [selectedCategory , setSelectedCategory] = useState("")

  
// Get all businesses
  useEffect(() => {
   
    axios
      .get(`${URL}/businesses`)
      .then((response)=>{
        const newBusinesses = response.data.map((business)=>{
          return{
            id: business.id,
            name: business.name,
            street: business.street,
            city: business.city,
            state: business.state,
            zipcode: business.zipcode,
            website: business.website,
            category: business.category,

          };
        });
        setBusinesses(newBusinesses);

      })
      .catch((error)=>{
        console.log(error);
      });

  }, []);

  const handleZipcode = (event) =>{
    const newZipcode = event.target.value
    setSelectedZipcode(newZipcode)
  }

  const handleCategory = (event) =>{
    const newCategory = event.target.value
    setSelectedCategory(newCategory)
  }

  const addNewBusiness = (businessInfo) =>{
    axios
      .post(`${URL}/businesses`,{
        name:businessInfo.name,
        street:businessInfo.street,
        city:businessInfo.city,
        state:businessInfo.state,
        zipcode:businessInfo.zipcode,
        website:businessInfo.website,
        category:businessInfo.category,

      })
      .then((response) =>{
        const newBusinesses = [...businesses]
        const newBusiness = {
        id:businessInfo.id,
        name:businessInfo.name,
        street:businessInfo.street,
        city:businessInfo.city,
        state:businessInfo.state,
        zipcode:businessInfo.zipcode,
        website:businessInfo.website,
        category:businessInfo.category,

        };
        businessInfo.id = response.data.id;
        newBusinesses.push(newBusiness);
        setBusinesses(newBusinesses)
      })
      .catch((error) =>{
        console.log(error.response.data)
      });
  }



  return (
    <div className="App">
      <h1>Know Your Neighborhood</h1>
      <div>
        <BusinessForm onClickAddBusiness={addNewBusiness}/>
      </div>
      <br/>
      <div className= "search_by">
        <label> Select Zipcode: </label>
        <DropdownZipcode businesses={businesses} value={selectedZipcode} onChange={handleZipcode}/>
        <label> select Category: </label>
        <DropDownCategory businesses={businesses} value={selectedCategory} onChangeCategory={handleCategory}/>
      </div>
      <div className="businesses-container">
        <h2>Business Sectors</h2>
        <BusinessList businesses={businesses} selectedZipcode={selectedZipcode} selectedCategory={selectedCategory}/>
      </div>
    </div>
  );
}

export default App;
