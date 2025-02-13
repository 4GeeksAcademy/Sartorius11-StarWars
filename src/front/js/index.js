//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/vapor/bootstrap.min.css";
//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "../js/pages/Layout.jsx";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
