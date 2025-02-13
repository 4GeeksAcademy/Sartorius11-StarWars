import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";

export const GetStartships = () => {
    const { store } = useContext(Context);
    if (!store.starship.name) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <div className="container m-auto">
            <div className="bg-black border border-warning card my-2">
                <h1 className="text-start mx-2">{store.starship.name}</h1>
                <div className="row m-2 g-0">
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/starships/${store.starship.uid}.jpg`}
                            className="img-fluid rounded"
                            alt={store.starship.name}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/400x500?text=Image+Not+Available";
                            }}
                        />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body fw-bold">
                            <p className="card-text">Model: {store.starship.model}</p>
                            <p className="card-text">Starship class: {store.starship.starship_class}</p>
                            <p className="card-text">Manufacturer: {store.starship.manufacturer}</p>
                            <p className="card-text">Passengers: {store.starship.passengers}</p>
                            <p className="card-text">Max atmosphering speed: {store.starship.max_atmosphering_speed}</p>
                            <p className="card-text">Hyperdrive rating: {store.starship.hyperdrive_rating}</p>
                            <p className="card-text">MGLT: {store.starship.MGLT}</p>
                            <p className="card-text">Cargo capacity: {store.starship.cargo_capacity}</p>
                            <p className="card-text">Consumables: {store.starship.consumables}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};