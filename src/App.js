import './App.css';
import BusinessForm from './components/BusinessForm'
import BusinessList from './components/BusinessList';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DropdownZipcode from './components/DropDownZipcode';
import DropDownCategory from './components/DropDownCategory';
import FavoriteList from './components/FavoriteBusinessList';
// import {useAuth0} from '@auth0/auth0-react';




export const URL = "https://know-your-neighborhood.herokuapp.com/";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedZipcode , setSelectedZipcode] = useState("")
  const [selectedCategory , setSelectedCategory] = useState("")
  // const [favoriteBusinesses, setFavoriteBusinesses] = useState([]);

  
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
            like_count:business.like_count,

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
        like_count:businessInfo.like_count


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
        like_count:businessInfo.like_count


        };
        businessInfo.id = response.data.id;
        newBusinesses.push(newBusiness);
        setBusinesses(newBusinesses)
      })
      .catch((error) =>{
        console.log(error.response.data)
      });
  }

  const onDeleteBusiness = (id) =>{
    console.log("I need to delete this")
    axios
    .delete(`${URL}/businesses/${id}`)
    .then((response) =>{
      const updatedBusinesses = [...businesses]
      const newBusiness = updatedBusinesses.filter((business)=> business.id !== response.data.id)
      setBusinesses(newBusiness)
    })
    .catch((error) =>{
      console.log(error.response.data);
    });
  };


  // const {isLoading} = useAuth0();
  // if(isLoading) return <div>Loading...</div>



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
        <BusinessList businesses={businesses} 
        selectedZipcode={selectedZipcode} 
        selectedCategory={selectedCategory}
        onDeleteBusiness={onDeleteBusiness}
        // onAddFavoriteBusiness={onAddFavoriteBusiness}
        />
      </div>
      <div>
        <FavoriteList businesses={businesses}/>
      </div>
    </div>
  );
}

export default App;
