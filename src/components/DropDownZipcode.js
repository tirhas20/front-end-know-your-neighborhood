import React from 'react';
import PropTypes from 'prop-types';
// import './DropdownZipcode.css'


const DropdownZipcode = ({businesses, value, onChange})=> {
    console.log(businesses)
    

    const uniqueZipcode = [...new Set(businesses.map(business =>{ return business.zipcode}))]
    const newZipcode = uniqueZipcode.map((zipcode)=>{
        return <option key = {zipcode}>{zipcode}</option>
    });


    return (
        <span className="dropdown-zipcode">
            <label>select Zipcode: </label>
            <select className='dropdown-zipcode' value={value} onChange={onChange}>

                <option label="All"></option>
                {newZipcode}
            </select>
        </span>
    )
}
DropdownZipcode.prototype ={
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
    onChange: PropTypes.func.isRequired

}

export default DropdownZipcode;
