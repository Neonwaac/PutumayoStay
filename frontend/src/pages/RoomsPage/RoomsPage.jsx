import React from "react";
import "./RoomsPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import RoomsLayout from "../../layouts/RoomsLayout/RoomsLayout";
function RoomsPage(){

    return(
        <section className="rooms-page">
            <NavigationBar />
            <h1>RoomsPage</h1>
            <RoomsLayout/>
        </section>
    );
}

export default RoomsPage;