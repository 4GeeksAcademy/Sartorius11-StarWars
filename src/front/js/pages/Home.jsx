import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">

			<img src="https://starwars.chocobar.net/star-wars-back0.jpg" className="img-fluid" />
		</div>
	);
};
