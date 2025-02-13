import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const ContactList = () => {
    //Js CODE

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);



    const handleDelete = (id) => {
        actions.deleteContact(id);
    };

    const handleEdit = (contact) => {
        actions.setCurrentContact(contact);
        navigate('/edit-contact');
    }

    return (
        <div>

            <div className="container mt-4">

                <div className="d-flex justify-content-end">
                    <Link to="/Add-contact">
                        <button type="button" className="btn btn-success mb-2">Add Contact</button>
                    </Link>
                </div>
                {store.contacts.map((iterator) => (
                    <div className="card mb-3" key={iterator.id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src=
                                    "https://pics.craiyon.com/2024-09-09/dK09IL9lRnuVjo53ep6yaA.webp"
                                    className="img-fluid rounded-start w-100 h-100" alt="..." />
                            </div>

                            <div className="col-md-8">

                                <div className="card-body d-grid m-3">
                                    <span className="text-end">
                                        <i className="fas fa-edit text-secondary me-2 pointer" onClick={() => handleEdit(iterator)}></i>
                                        <i className="fa fa-trash text-danger pointer" onClick={() => handleDelete(iterator.id)}></i>
                                    </span>
                                    <h5 className="card-title mb-3">{iterator.name}</h5>

                                    <p className="card-text text-secondary" >
                                        <span className="fa fa-location-dot me-3 "></span>
                                        {iterator.address}
                                    </p>
                                    <p className="card-text text-secondary">
                                        <span className="fa fa-phone me-3 "></span>
                                        {iterator.phone}
                                    </p>
                                    <p className="card-text text-secondary">
                                        <span className="fa fa-envelope me-3"></span>
                                        {iterator.email}
                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}



