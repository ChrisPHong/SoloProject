import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './BusinessFormPage.css';
import { createBusiness } from '../../store/business';
import { useHistory } from 'react-router-dom';


function BusinessPageForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    let userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        const error = [];
        if (title.length < 1) error.push('You must put a title')
        if (description.length < 1) error.push('You must put a description')
        if (address.length < 1) error.push('You must put an address')
        if (state.length < 1) error.push('You must put a state')
        if (city.length < 1) error.push('You must put a city')
        if (zipCode.length < 1) error.push('You must put a zipcode')
        if (phoneNumber.length < 1) error.push('You must put a phone number')
        if (image.length < 1) error.push('You must put an image URL')

        setErrors(error);
    }, [title, description, address, state, city, zipCode, phoneNumber, image])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {
                userId,
                title,
                description,
                address,
                city,
                state,
                zipCode,
                phoneNumber,
                image
            }
            dispatch(createBusiness(payload))
            history.push('/businesses');
        }

    }

    return (
        <form className="businessForm" onSubmit={onSubmit}>
           {errors.length > 0 ?  <h2>Validation Errors</h2> : null}
            <ul className='errors array'>{errors.length > 0 ? errors.map(error => {
                return (
                <>
                <li key={error}>{error}</li>
                </>
                )
            }) : null}
            </ul>
            <div className='titleInput'>
                {/* <label className='labelInput'>Title</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Business Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>Description</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>Address</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='12345 Squeals St.'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>City</label> */}
                <input type='text'
                    className='inputBox'
                    required
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>State</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>Zip</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Zip code'
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />

            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>Phone Number</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className='formDiv'>

                {/* <label className='labelInput'>Image</label> */}
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <button
                className='submitButton'
                type='submit'
                disabled={errors.length > 0 ? true : false}
            >Submit</button>
        </form>
    )
}

export default BusinessPageForm;
