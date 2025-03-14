import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDetails = (character) => {
        actions.getCharacter(character.uid)
        navigate("/get-character");
    }
    //llamo a la api para recorrer todas las cards
    return (
        <div>
            <div className="container my-5">
                <h1 className="text-center mb-4 text-secondary">Characters</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {store.characters.map((item) => (
                        <div key={item.uid} className="card  border-0 overflow-hidden">
                            <img className="card-img-top img-fluid rounded img-custom " alt={item.name} onError={(e) => { e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/big-placeholder.jpg" }}
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${item.uid}.jpg`} />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{item.name}</h5>
                                <div className="d-flex justify-content-center gap-3 mt-3">
                                    <button className="btn btn-secondary" onClick={() => handleDetails(item)} >Details</button>
                                    <button className={`btn btn-${store.favorites.includes(item.name) ? "danger" : "outline-danger"}  rounded-2`} onClick={() => actions.setFavorites(item.name)}>
                                        <i className="fa-regular fa-heart fa-xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
}