import React from 'react';
import PropTypes from 'prop-types';

const DropDownCategory = ({businesses, value, onChangeCategory}) => {
    const uniqueCategory = [...new Set(businesses.map(business => business.category))]
    const newCategory = uniqueCategory.map((category)=>(
    <option key ={category} >{category}</option>
    ));
    return (
        <select className="dropdown-category" value={value} onChange={onChangeCategory}>
            <option label="select an option "></option>
            {newCategory}
        </select>
    )
}
DropDownCategory.propTypes={
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
    
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChangeCategory: PropTypes.func.isRequired
}

export default DropDownCategory;
