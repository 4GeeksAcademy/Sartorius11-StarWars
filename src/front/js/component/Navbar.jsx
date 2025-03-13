// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../store/appContext.js";
// import { useNavigate } from "react-router-dom";
// export const Navbar = () => {
// 	//Code JS
// 	const { store, actions } = useContext(Context);
// 	const navigate = useNavigate();

// 	const user = JSON.parse(localStorage.getItem("user"));

// 	const handleLog = () => {
// 		if (store.isLogged) {
// 			actions.logout();
// 		} else {
// 			navigate('/login')
// 		}
// 	}
// 	return (
// 		<nav className="navbar navbar-light bg-light shadow-sm py-3">
// 			<div className="container d-flex justify-content-between align-items-center">
// 				<Link to="/" className="text-decoration-none">
// 					<img src="https://png.pngtree.com/png-vector/20230822/ourmid/pngtree-star-wars-chewie-icon-character-flat-design-vector-illustration-png-image_6846972.png" className="h-25 w-25" />

// 				</Link>
// 				<ul className="nav me-auto mb-2 mb-lg-0" >

// 					<div className="d-flex gap-2">
// 						<Link to="/characters">
// 							<button className="btn btn-secondary">Characters</button>
// 						</Link>
// 						<Link to="/planets">
// 							<button className="btn btn-info">Planets</button>
// 						</Link>
// 						<Link to="/starships">
// 							<button className="btn btn-primary">Starships</button>
// 						</Link>
// 						<Link to="/Contact-List">
// 							<button className="btn btn-primary">Contact List</button>
// 						</Link>
// 						<Link to="/favorites">
// 							<button type="button" className="btn btn-danger position-relative">
// 								Favorites
// 								<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">

// 									<span className="visually-hidden">unread messages</span>
// 								</span>
// 							</button>
// 						</Link>
// 						<div className="btn-group" role="group">
// 							{store.isLogged ? (
// 								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
// 									<li className="nav-item">
// 										<span onClick={() => navigate("/profile")} className="nav-link text-light me-3">Welcome, {user.first_name}</span>
// 									</li>
// 									<li className="nav-item">
// 										<span onClick={handleLog} className="nav-link">Logout</span>
// 									</li>
// 								</ul>
// 							) : (
// 								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
// 									<li className="nav-item">
// 										<span onClick={() => navigate("/login")} className="nav-link">Login</span>
// 									</li>
// 									<li className="nav-item">
// 										<span onClick={() => navigate("/register")} className="nav-link">Register</span>
// 									</li>
// 								</ul>
// 							)}
// 							<button id="btnGroupDrop1" type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
// 								<i className="fa fa-heart text-light pointer"></i>
// 							</button>
// 							<ul className="dropdown-menu dropdown-menu-end p-2" aria-labelledby="btnGroupDrop1">
// 								{store.favorites.length === 0 ? (
// 									<li className="disabled px-2"> No favorites </li>) : (
// 									store.favorites.map((item) => (
// 										<li key={item.uid} className="dropdown-item d-flex justify-content-between align-items-center">
// 											<span>{item.name}</span>
// 											<i className="fa fa-trash text-danger pointer px-2" onClick={() => { actions.removeFavorite(item) }}></i>
// 										</li>
// 									)
// 									))}
// 							</ul>
// 						</div>
// 					</div>
// 				</ul>

// 			</div>
// 		</nav>
// 	);
// };
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const user = store.user


	const handleLog = () => {
		if (store.isLogged) {
			actions.logout();
		} else {
			navigate('/login')
		}
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none">
					<img src="https://png.pngtree.com/png-vector/20230822/ourmid/pngtree-star-wars-chewie-icon-character-flat-design-vector-illustration-png-image_6846972.png" className="h-25 w-25" />

				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to='/contact-List' className="nav-link">Contact List</Link>
						</li>
						<li className="nav-item">
							<Link to='/characters' className="nav-link">Characters</Link>
						</li>
						<li className="nav-item">
							<Link to='/starships' className="nav-link">Starships</Link>
						</li>
						<li className="nav-item">
							<Link to='/planets' className="nav-link">Planets</Link>
						</li>
						{/* <li className="nav-item">
							<Link to='/edit-profile' className="nav-link">EDITAR PERFIL</Link>
						</li> */}

					</ul>
				</div>
				<div className="btn-group" role="group">
					{store.isLogged ? (
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<span onClick={() => navigate("/profile")} className="nav-link text-light me-3">Welcome, {user.first_name}</span>
							</li>
							<li className="nav-item">
								<span onClick={handleLog} className="nav-link">Logout</span>
							</li>
						</ul>
					) : (
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<span onClick={() => navigate("/login")} className="nav-link">Login</span>
							</li>
							<li className="nav-item">
								<span onClick={() => navigate("/register")} className="nav-link">Register</span>
							</li>
						</ul>
					)}
					<button id="btnGroupDrop1" type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							{store.favorites.length}
						</span>
						<i className="fa fa-heart text-light pointer"></i>
					</button>
					<ul className="dropdown-menu dropdown-menu-end p-2" aria-labelledby="btnGroupDrop1">
						{store.favorites.length === 0 ? (
							<li className="disabled px-2"> No favorites </li>) : (
							store.favorites.map((item, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
									<span>{item}</span>
									<i className="fa fa-trash text-danger pointer px-2" onClick={() => { actions.setFavorites(item) }}></i>
								</li>
							)
							))}
					</ul>
				</div>
			</div>
		</nav>
	);
};