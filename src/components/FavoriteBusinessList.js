import React from 'react';
import PropTypes from 'prop-types';
import './FavoriteBusinessList.css'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading'


const getFavoriteBusinessListJSX = (businesses,result,onRemoveBusinessFromFavorite) =>{
    if(result){
        businesses = businesses.filter((business) => business.like_count >= result)
    }
    return (
        businesses.map((business) =>
        <tr key ={business.id}>
                <td>{business.name}</td>
                <td>{business.street},{business.city},{business.state},{business.zipcode}</td> 
                <td>{business.website}</td>
                <td>{business.category}</td>
                <td>{business.like_count}</td>
                <td>
                    <button className="remove-business" onClick={() =>onRemoveBusinessFromFavorite(business.id)}>Remove</button>
                </td>
            </tr>
        ) 
    )  
}; 

const FavoriteList = ({businesses,favoriteLike_count,onRemoveBusinessFromFavorite}) => {
    const {  isAuthenticated } = useAuth0();
    
    return( 
        isAuthenticated &&(
        <div className="table-wrapper">
            <h2>Favorite Businesses</h2>
            <table className="fl-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Website</th>
                    <th>Category</th>
                    <th>like_count</th>
                    <th>Remove</th> 
                </tr>
                </thead>
                <tbody>
                    {getFavoriteBusinessListJSX(businesses,1,onRemoveBusinessFromFavorite)}
                </tbody>
            </table>
        </div>  
    )
    )
}
FavoriteList.prototype = {
    favoriteBusinesses: PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number.isRequired,
            name:PropTypes.string.isRequired,
            street:PropTypes.string.isRequired,
            city:PropTypes.string.isRequired,
            state:PropTypes.string.isRequired,
            website:PropTypes.string.isRequired,
            category:PropTypes.string.isRequired,
            limit:PropTypes.number.isRequired,
            searchLike_count:PropTypes.number.isRequired
        })
    ).isRequired, 
    onRemoveBusinessFromFavorite:PropTypes.func.isRequired,
}

export default withAuthenticationRequired(FavoriteList, {
    onRedirecting: () => <Loading />,
    });
