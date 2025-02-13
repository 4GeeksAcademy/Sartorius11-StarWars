import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';

export const AddContact = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmitAdd = (event) => {
        event.preventDefault();
        const newContact = {
            name,
            email,
            phone,
            address
        };
        actions.addContacts(newContact);
        navigate('/contact-list');
    }



    return (
        <div>
            <form onSubmit={handleSubmitAdd}>
                <div className="container">
                    <h1 className='text-center'>Add a new contact</h1>
                    <div className="row m-3">
                        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Full Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Full Name"
                                value={name} onChange={(event) => { setName(event.target.value) }} />
                        </div>

                    </div>
                    <div className="row m-3">
                        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Enter text"
                                value={email} onChange={(event) => { setEmail(event.target.value) }} />
                        </div>

                    </div>
                    <div className="row m-3">
                        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Phone</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Enter phone"
                                value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                        </div>

                    </div>
                    <div className="row m-3">
                        <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Address</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Enter address"
                                value={address} onChange={(event) => { setAddress(event.target.value) }} />
                        </div>
                        <button type="submit" className="btn btn-success mt-2" >Save</button>
                        <div className="d-flex justify-content-start">
                            <Link to="/contact-list">
                                <button type="submit" className="btn btn-warning my-3">Get back to contacts</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

