import './App.css';
import BusinessForm from './components/BusinessForm'
import BusinessList from './components/BusinessList';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DropdownZipcode from './components/DropDownZipcode';
import DropDownCategory from './components/DropDownCategory';
import FavoriteList from './components/FavoriteBusinessList';
import EditBusiness from './components/EditBusiness'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import Profile from './components/Profile'
import Home from './components/Home'
import NavBar from './components/NavBar';




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

  const onAddFavoriteBusiness = (id) =>{
    axios
      .patch(`${URL}/businesses/${id}/like`)
      .then((response) =>{
        const updatedBusinessessLike_count = [...businesses];
        for(let business of businesses){
          if(id===business.id){
            business.like_count=response.data.like_count;
            }
          }
          setBusinesses(updatedBusinessessLike_count);
        })
        .catch((error) =>{
          console.log(error.response.data);

        });
      }

      const onRemoveBusinessFromFavorite = (id) =>{
        axios
          .patch(`${URL}/businesses/${id}/dislike`)
          .then((response) =>{
            const newUpdateLike_count = [...businesses];
            for(let business of businesses){
              if(id===business.id){
                business.like_count=response.data.like_count;
                }
              }
              setBusinesses(newUpdateLike_count);
            })
            .catch((error) =>{
              console.log(error.response.data);
    
            });
          }

      const onUpdateBusiness = (editedBusiness) =>{
        axios
          .patch(`${URL}/businesses/${editedBusiness.id}`,{
                id:editedBusiness.id,
                name:editedBusiness.name,
                street:editedBusiness.street,
                city: editedBusiness.city,
                state: editedBusiness.state,
                zipcode: editedBusiness.zipcode,
                website: editedBusiness.website,
                category: editedBusiness.category,
                like_count: editedBusiness.like_count,
              }
          )
          .then((response) =>{
            const updateBusinesses = [...businesses];
            for(let business of updateBusinesses){
              if(editedBusiness.id ===business.id){
                business.id = response.data.id;
                business.name = response.data.name;
                business.street=response.data.street;
                business.city = response.data.city;
                business.state = response.data.state;
                business.zipcode = response.data.zipcode;
                business.website = response.data.website;
                business.category = response.data.category;
                business.like_count = response.data.like_count;
              }
            }
            setBusinesses(updateBusinesses);
          })
          .catch((error) =>{
            console.log(error.response.data)
          })
      }


  const {isLoading} = useAuth0();
  if(isLoading) return <div>Loading...</div>



  return (
    
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path="/resources" element={<><DropdownZipcode businesses={businesses} value={selectedZipcode} onChange={handleZipcode}/>
                                      <DropDownCategory businesses={businesses} value={selectedCategory} onChangeCategory={handleCategory}/>
                                      <BusinessList businesses={businesses} 
                                          selectedZipcode={selectedZipcode} 
                                          selectedCategory={selectedCategory} 
                                          onDeleteBusiness={onDeleteBusiness}
                                          onAddFavoriteBusiness={onAddFavoriteBusiness}/></>}/>
              <Route path="/form" element={ <BusinessForm onClickAddBusiness={addNewBusiness}/>}/>
              <Route path="/update/:id" element={ <EditBusiness onClickUpdateBusiness={onUpdateBusiness} businesses={businesses}/>}/>
              <Route path="/favorite" element={<FavoriteList businesses={businesses}
              onRemoveBusinessFromFavorite={onRemoveBusinessFromFavorite}/>}/>
              <Route path="/profile" element={<Profile/>}/>
          </Routes>
      </BrowserRouter>
    );
}

export default App;
