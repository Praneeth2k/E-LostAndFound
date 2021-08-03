import React, {useContext} from "react";
import {Switch, Route} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import LostComponent from "./lost components/LostComponent";
import FoundComponent from "./found components/FoundComponent";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import Header from "./Header.js";
import Footer from "./Footer.js";
import useToggler from "./useToggler"
import {ThemeContext} from "./themeContext" 

function MainComponent(){
    const {theme} = useContext(ThemeContext)

    return (
        <div className = {theme}>
        <Header/>
        <Switch>
            <Route exact path = "/"><HomeComponent /></Route>
            <Route path = "/login"><LoginComponent /></Route>
            <Route path = "/found"><FoundComponent /></Route>
            <Route path = "/lost"><LostComponent /></Route>
            <Route path = "/signup"><SignupComponent /></Route>
        </Switch>
        <Footer />
        </div>
    )
}

export default MainComponent;