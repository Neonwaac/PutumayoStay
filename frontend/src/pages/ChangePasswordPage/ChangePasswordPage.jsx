import React from "react";
import "./ChangePasswordPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";

function ChangePasswordPage(){
    return(
        <section className="change-password-page">
            <NavigationBar />
            <h1>Change Password</h1>
            <AppFooter />
        </section>
    )
}

export default ChangePasswordPage;