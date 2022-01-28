import React from 'react';
import PropTypes from "prop-types";
import './Business.css'

const Business = ({id, name, street, city, state, zipcode, website, category})=> {

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{street},{city},{state},{zipcode}</td>
            <td>
                <a href={website} target="blank">{website}</a>
            </td>
            <td>{category}</td>
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
    category:PropTypes.string.isRequired
}

export default Business;
