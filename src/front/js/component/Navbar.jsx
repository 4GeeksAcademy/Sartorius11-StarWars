import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	//Code JS
	return (
		<nav className="navbar navbar-light bg-light shadow-sm py-3">
			<div className="container d-flex justify-content-between align-items-center">
				<Link to="/" className="text-decoration-none">
					<img src="https://png.pngtree.com/png-vector/20230822/ourmid/pngtree-star-wars-chewie-icon-character-flat-design-vector-illustration-png-image_6846972.png" className="h-25 w-25" />

				</Link>
				<ul className="nav me-auto mb-2 mb-lg-0" >

					<div className="d-flex gap-2">
						<Link to="/characters">
							<button className="btn btn-secondary">Characters</button>
						</Link>
						<Link to="/planets">
							<button className="btn btn-info">Planets</button>
						</Link>
						<Link to="/starships">
							<button className="btn btn-primary">Starships</button>
						</Link>
						<Link to="/Contact-List">
							<button className="btn btn-primary">Contact List</button>
						</Link>
						<Link to="/favorites">
							<button type="button" className="btn btn-danger position-relative">
								Favorites
								<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">

									<span className="visually-hidden">unread messages</span>
								</span>
							</button>
						</Link>
					</div>
				</ul>

			</div>
		</nav>
	);
};
