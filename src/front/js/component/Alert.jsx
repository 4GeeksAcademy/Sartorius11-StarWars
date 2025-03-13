import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Alert = () => {
    const { store } = useContext(Context);
    console.log("esto es un alert")

    return (
        <div className={`container ${store.alert.visible ? '' : 'd-none'}`}>
            <div className={`alert alert-${store.alert.background} alert-dismissible fade show`} role="alert">
                {store.alert.text}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}
