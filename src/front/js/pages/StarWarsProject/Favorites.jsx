import React, { useContext } from 'react'
import { Context } from '../../store/appContext';

export const Favorites = () => {

    const { store, actions } = useContext(Context);


    return (
        <div>
            {
                store.favorites.map(favorito => {
                    return (
                        <div>
                            <p>
                                Nombre:{favorito.name}
                                <br />
                                id:{favorito.uid}
                            </p>

                        </div>
                    )
                })

            }

        </div>
    )
}

