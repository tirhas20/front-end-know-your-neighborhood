import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './BusinessForm.css';
import Loading from './Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const BusinessForm = (props)=> {
    const [formFields, setFormFields] = useState(
        {
            name:"",
            street:'',
            city:'',
            state:'',
            zipcode:'',
            website:'',
            category:'',

        }
    )

    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/resources`; 
        navigate(path);
        }
    

    const onFormSubmit = (event) =>{
        event.preventDefault();
        props.onClickAddBusiness(formFields)
        routeChange()
    }
    const onNameChange = (event) =>{
        setFormFields({...formFields,
        name: event.target.value})
    }

    const onCityChange = (event) =>{
        setFormFields({...formFields,
        city: event.target.value})
    }

    const onStreetChange = (event) =>{
        setFormFields({...formFields,
        street: event.target.value})
    }

    const onStateChange = (event) =>{
        setFormFields({...formFields,
        state: event.target.value})
    }

    const onZipcodeChange = (event) =>{
        setFormFields({...formFields,
        zipcode: event.target.value})
    }

    const onWebsiteChange = (event) =>{
        setFormFields({...formFields,
        website: event.target.value})
    }

    const onCategoryChange = (event) =>{
        setFormFields({...formFields,
        category: event.target.value})
    }
    const onLike_countChange = (event) =>{
        setFormFields({...formFields,
        like_count: event.target.value})
    }

    return (
        <div className='business-form-container'>
            <h2>Add a New Business</h2>
            <form className="form-fields" onSubmit={onFormSubmit}>
                <label> Business name</label>
                <input type="text" 
                    required 
                    value={formFields.name} 
                    onChange={onNameChange}/> 
                
                <label> Street</label>
                <input type="text" 
                    required 
                    value={formFields.street} 
                    onChange={onStreetChange }/>
                
                <label> City</label>
                <input type="text" 
                    required 
                    value={formFields.city}
                    onChange={onCityChange}/>
                <label> State</label>
                <input type="text" 
                    required 
                    value={formFields.state}
                    onChange={onStateChange }/>
                <label> Zipcode</label>
                <input type="text" 
                    required 
                    value={formFields.zipcode}
                    onChange={onZipcodeChange}/>
                <label> Website</label>
                <input type="text" 
                    value={formFields.website}
                    onChange={onWebsiteChange}/>
                <label> Category</label>
                <input type="text" 
                    required 
                    value={formFields.category}
                    onChange={onCategoryChange}/>
                <label> Like_count</label>
                <input type="text" 
                required 
                value={formFields.like_count}
                onChange={onLike_countChange}/>
                <br/>
                <button className="submit-button" type="button">Add Business</button>
            </form>
        </div>
    )
}
BusinessForm.prototype ={
    onClickAddBusiness: PropTypes.func.isRequired,
}

export default withAuthenticationRequired(BusinessForm, {
    onRedirecting: () => <Loading />,
    });
