import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleViewPassword = () => setViewPassword(!viewPassword);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };

        actions.register(dataToSend);
        navigate('/');
    };

    return (
        <div className="container">
            <h1 className="text-center text-primary">Register</h1>
            <div className="row text-start">
                <div className="col-10 col-md-6 col-lg-4 m-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                placeholder="Enter your email"
                                required
                            />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={viewPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    className="input-group-text"
                                    type="button"
                                    onClick={handleViewPassword}
                                >
                                    <i className={`fa ${viewPassword ? 'fa-eye-slash text-danger' : 'fa-eye text-primary'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mx-2">Register</button>
                            <button type="reset" className="btn btn-secondary mx-2">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
