import React from 'react';
import PropTypes from 'prop-types';
import Business from './Business'
import './BusinessList.css';

const getBusinessListJSX = (businesses, filterZipcode, filterCategory)=>{
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
  .map((business)=>
    
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

      />
    );
};

const BusinessList = ({businesses,selectedZipcode,selectedCategory})=> {

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
            <th>Like</th>
        </tr>
        </thead>
        <tbody>
          {getBusinessListJSX(businesses,selectedZipcode,selectedCategory)}
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
      category:PropTypes.string.isRequired
    })

  ).isRequired
};

export default BusinessList;
