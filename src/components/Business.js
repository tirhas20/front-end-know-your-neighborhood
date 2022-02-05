import React from 'react';
import PropTypes from "prop-types";
import './Business.css'
import {Link} from 'react-router-dom';


const Business = ({id, name, street, city, state, zipcode, website, category,like_count, onDeleteBusiness, onAddFavoriteBusiness})=> {

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{street},{city},{state},{zipcode}</td>
            <td>
                <a href={website} target="blank">{website}</a>
            </td>
            <td>{category}</td>
            {/* <td>{like_count}</td> */}
            <td>
                <Link to={`/update/${id}`}>
                <button className="update-business">Update</button>
                </Link>
            </td>
            <td>
                <button onClick={()=>onDeleteBusiness(id)}>Delete</button>
            </td>
            <td>
                <button onClick={()=>onAddFavoriteBusiness(id)}>Add To Favorite</button>
            </td>
        </tr>
    )
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
