import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Business from './Business'
import './BusinessList.css';
import { useAuth0 } from '@auth0/auth0-react';
import TableFormat from './TableFormat'
import TableFooter from './TableFooter'


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

const BusinessList = ({businesses,selectedZipcode,rowsPerPage,selectedCategory,onDeleteBusiness,onAddFavoriteBusiness})=> {
  const {  isAuthenticated } = useAuth0();
  const [page, setPage] = useState(1);
  const { slice, range } = TableFormat(businesses, page, rowsPerPage);
  if(isAuthenticated){
    return (
      <div className="table-wrapper">
        <h2>Business Sectors</h2>
        <table className="fl-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Website</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Like</th>
                <th>Show on map</th>
            </tr>
            </thead>
            <tbody>
              {getBusinessListJSX(slice,selectedZipcode,selectedCategory,onDeleteBusiness,onAddFavoriteBusiness)}
          </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </div>
    )
  }else{
    return(
      <div className="table-wrapper">
        <h2>Business Sectors</h2>
        <table className="fl-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Website</th>
                <th>Category</th>
                <th>Show on map</th>
                </tr>
            </thead>
            <tbody>
              {getBusinessListJSX(slice,selectedZipcode,selectedCategory,onDeleteBusiness,onAddFavoriteBusiness)}
          </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </div>
    )
  }
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
