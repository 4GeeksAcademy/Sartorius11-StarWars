import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";

export const GetPlanet = () => {

    const { store } = useContext(Context);

    if (!store.planet.name) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    
    return (
        <div className="container m-auto">
            <div className="bg-black border border-warning card my-2">
                <h1 className="text-start mx-2">{store.planet.name}</h1>
                <div className="row m-2 g-0">
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planet/${store.planet.uid}.jpg`}
                            className="img-fluid rounded"
                            alt={store.planet.name}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/400x500?text=Image+Not+Available";
                            }}
                        />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body fw-bold">
                            <p className="card-text">Diameter: {store.planet.diameter}</p>
                            <p className="card-text">Rotation Period: {store.planet.rotation_period}</p>
                            <p className="card-text">Orbital Period: {store.planet.orbital_period}</p>
                            <p className="card-text">Gravity: {store.planet.gravity}</p>
                            <p className="card-text">Population: {store.planet.population}</p>
                            <p className="card-text">Climate: {store.planet.climate}</p>
                            <p className="card-text">Climate: {store.planet.terrain}</p>
                            <p className="card-text">Surface water: {store.planet.surface_water}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};