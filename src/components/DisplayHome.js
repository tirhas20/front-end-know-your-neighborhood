import React from 'react'
import img2 from '../images/images.png'
import {Link} from 'react-router-dom'
import './DisplayHome.css'

const DisplayHome = () => {
return (
    <div>
        <Link to="/">
            <img className='display-home' src={img2} alt="icon"/> 
        </Link>
    </div>
)
}

export default DisplayHome