import React from 'react';
import PropTypes from 'prop-types';
import Business from './Business'
import './BusinessList.css';

const getBusinessListJSX = (businesses, filterZipcode, filterCategory,onDeleteBusiness,onAddFavoriteBusiness)=>{
  if (filterZipcode && filterCategory){
    businesses=businesses
  .filter((business)=>business.zipcode===filterZipcode)
  .filter((business) => business.category ===filterCategory)
  } else if (filterZipcode){
    businesses=businesses
  .filter((business)=>business.zipcode===filterZipcode)
  }else if (filterCategory){
    businesses=businesses
  .filter((business)=>business.category===filterCategory)
  }
  
  return businesses
  .map((business)=>{
    return(
    <Business 
      key={business.id} 
      id={business.id} 
      name={business.name} 
      street={business.street} 
      city={business.city} 
      state={business.state} 
      zipcode={business.zipcode} 
      website={business.website}
      category={business.category}
      like_count={business.like_count}
      onDeleteBusiness={onDeleteBusiness}
      onAddFavoriteBusiness={onAddFavoriteBusiness}
      />
    )
  }
    );
};

const BusinessList = ({businesses,selectedZipcode,selectedCategory,onDeleteBusiness,onAddFavoriteBusiness})=> {

  return (
    <div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>BusinessId</th>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
            <th>Category</th>
            {/* <th>Like_count</th> */}
            <th>Edit</th>
            <th>Delete</th>
            <th>Like</th>
        </tr>
        </thead>
        <tbody>
          {getBusinessListJSX(businesses,selectedZipcode,selectedCategory,onDeleteBusiness,onAddFavoriteBusiness)}
      </tbody>
    </table>
    </div>
  )
}
BusinessList.prototype ={
  businesses: PropTypes.arrayOf(
    PropTypes.shape({
      id:PropTypes.number.isRequired,
      name:PropTypes.string.isRequired,
      street:PropTypes.string.isRequired,
      city:PropTypes.string.isRequired,
      state:PropTypes.string.isRequired,
      website:PropTypes.string.isRequired,
      like_count:PropTypes.number.isRequired,
      category:PropTypes.string.isRequired,
      
    })

  ).isRequired,
  onDeleteBusiness:PropTypes.func.isRequired,
  onAddFavoriteBusiness:PropTypes.func.isRequired,
};

export default BusinessList;
