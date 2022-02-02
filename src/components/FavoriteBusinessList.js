import React from 'react';
import PropTypes from 'prop-types';


const getFavoriteBusinessListJSX = (businesses,result) =>{
    if(result){
        businesses = businesses.filter((business) => business.like_count >= result)
    }
    return (
        businesses.map((business) =>
        <tr key ={business.id}>
                <td>{business.id}</td>
                <td>{business.name}</td>
                <td>{business.street},{business.city},{business.state},{business.zipcode}</td> 
                <td>{business.website}</td>
                <td>{business.category}</td>
                <td>{business.like_count}</td>
            </tr>

        ) 
    )  
}; 

const FavoriteList = ({businesses,searchLike_count}) => {
    
    return( 
        <div className="table-wrapper">
            <h2>Favorite Businesses</h2>
            <table className="fl-table">
                <thead>
                <tr>
                    <th>BusinessId</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Website</th>
                    <th>Category</th>
                    <th>like_count</th>
                </tr>
                </thead>
                <tbody>
                    {getFavoriteBusinessListJSX(businesses,searchLike_count)}
                </tbody>
            </table>
        </div>  
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
}

export default FavoriteList;
