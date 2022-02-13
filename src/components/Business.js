import React from 'react';
import PropTypes from "prop-types";
import './Business.css'
import {Link} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';



const Business = ({id, name, street, city, state, zipcode, website, category,like_count, onDeleteBusiness, onAddFavoriteBusiness})=> {
    const {  isAuthenticated } = useAuth0();
    if(isAuthenticated){
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{street},{city},{state},{zipcode}</td>
                <td>
                    <a href={website} target="blank">{website}</a>
                </td>
                <td>{category}</td>
                <td>
                    <Link to={`/update/${id}`}>
                    <button className="update-business">Update</button>
                    </Link>
                </td>
                <td>
                    <button className="delete-business" onClick={()=>onDeleteBusiness(id)}>Delete</button>
                </td>
                <td>
                    <button className="add-business-to-favorite" onClick={()=>onAddFavoriteBusiness(id)}>Add To Favorite</button>
                </td>
                <td>
                <a href={"http://maps.google.com/maps?q=" + street + ',' + city + ','  + state + ',' + zipcode } rel="Location on the map" target="blank"> Direction</a> 
                </td>
            </tr>
        )
    }else{
        return(
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{street},{city},{state},{zipcode}</td>
                <td>
                    <a href={website} target="blank">{website}</a>
                </td>
                <td>{category}</td>
                <td>
                    <a href={"http://maps.google.com/maps?q=" + street + ',' + city + ','  + state + ',' + zipcode } rel="Location on the map" target="blank"> View map</a> 
                </td>
            </tr>
        )
    }
};

Business.prototype={
    id:PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    street:PropTypes.string.isRequired,
    city:PropTypes.string.isRequired,
    state:PropTypes.string.isRequired,
    website:PropTypes.string.isRequired,
    category:PropTypes.string.isRequired,
    like_count:PropTypes.number.isRequired,
    onDeleteBusiness:PropTypes.func.isRequired
}

export default Business;
