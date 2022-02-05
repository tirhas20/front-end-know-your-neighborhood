import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditBusiness.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




const EditBusiness = ({ businesses, onClickUpdateBusiness }) => {
    const { id } = useParams();
    const [selectedBusiness, setSelectedBusiness] = useState(() => {
        for (let business of businesses) {
            if (business.id === parseInt(id)) {
                return business
            }
            
        } 
        
    })

    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/resources`; 
        navigate(path);
        }


    const onFormSubmit = (event) => {
        event.preventDefault();
        onClickUpdateBusiness(selectedBusiness)
        routeChange()

    }

    const onIdChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            id: event.target.value
        })
    }

    const onNameChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            name: event.target.value
        })
    }

    const onCityChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            city: event.target.value
        })
    }

    const onStreetChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            street: event.target.value
        })
    }

    const onStateChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            state: event.target.value
        })
    }

    const onZipcodeChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            zipcode: event.target.value
        })
    }

    const onWebsiteChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            website: event.target.value
        })
    }

    const onCategoryChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            category: event.target.value
        })
    }
    const onLike_countChange = (event) => {
        setSelectedBusiness({
            ...selectedBusiness,
            like_count: event.target.value
        })
    }

    return (
        <div className='business-form-container'>
            <h2>Update Business Data</h2>
            <form className="form-fields" onSubmit={onFormSubmit}>
                <label> Business Id</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.id}
                    onChange={onIdChange} />
                <label> Business name</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.name}
                    onChange={onNameChange} />

                <label> Street</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.street}
                    onChange={onStreetChange} />

                <label> City</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.city}
                    onChange={onCityChange} />
                <label> State</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.state}
                    onChange={onStateChange} />
                <label> Zipcode</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.zipcode}
                    onChange={onZipcodeChange} />
                <label> Website</label>
                <input type="text"
                    defaultValue={selectedBusiness.website}
                    onChange={onWebsiteChange} />
                <label> Category</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.category}
                    onChange={onCategoryChange} />
                <label> Like_count</label>
                <input type="text"
                    required
                    defaultValue={selectedBusiness.like_count}
                    onChange={onLike_countChange} />
                <br />
                <button className="submit-button" type="submit">Update</button>
            </form>
        </div>
    )
}
EditBusiness.prototype = {
    onClickupdateBusiness: PropTypes.func.isRequired,
}


export default EditBusiness;
