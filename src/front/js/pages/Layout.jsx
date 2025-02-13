import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "../store/appContext.js";

//Custom Component
import ScrollToTop from "../component/ScrollToTop.jsx";
import { BackendURL } from "../component/BackendURL.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { Footer } from "../component/Footer.jsx";

import { ContactList } from "./ContactList.jsx";


//Custom Pages or Views
import { Home } from "./Home.jsx";
import { Demo } from "./Demo.jsx";
import { Single } from "./Single.jsx";
import { AddContact } from "./AddContact.jsx";
import { EditContact } from "./EditContact.jsx";

//imports of StarsWars Project
import { Characters } from "./StarWarsProject/Characters.jsx";
import { Planets } from "./StarWarsProject/Planets.jsx";
import { Starships } from "./StarWarsProject/Starships.jsx";
import { GetCharacter } from "./StarWarsProject/GetCharacter.jsx";

import { GetPlanet } from "./StarWarsProject/GetPlanet.jsx";
import { GetStartships } from "./StarWarsProject/GetStarships.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<GetCharacter />} path="/get-character" />
                        <Route element={<GetPlanet />} path="/get-planet" />
                        <Route element={<GetStartships />} path="/get-starships" />

                        <Route element={<Starships />} path="/starships" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<AddContact />} path="/add-contact" />
                        <Route element={<ContactList />} path="/contact-list" />
                        <Route element={<EditContact />} path="/edit-contact" contact-list />

                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path='*' />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
