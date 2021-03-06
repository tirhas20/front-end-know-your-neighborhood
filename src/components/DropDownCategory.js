import React from 'react';
import PropTypes from 'prop-types';

const DropDownCategory = ({businesses, value, onChangeCategory}) => {
    const uniqueCategory = [...new Set(businesses.map(business =>{return business.category}))]
    const newCategory = uniqueCategory.map((category)=>{
    return <option key ={category} >{category}</option>
    });
    return (
        <span className="dropdown-category">
            <label>select Category:</label>
            <select value={value} onChange={onChangeCategory}>
                <option label="All"></option>
                {newCategory}
            </select>
        
        </span>
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
        category:PropTypes.string.isRequired,
        like_count:PropTypes.number.isRequired
        })
    
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChangeCategory: PropTypes.func.isRequired
}

export default DropDownCategory;
