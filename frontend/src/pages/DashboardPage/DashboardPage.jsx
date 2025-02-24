import React from "react";
import "./DashboardPage.css";
import UserImageForm from "../../components/ImageForm/UserImageForm";
import DashboardMenu from "../../components/DashboardMenu/DashboardMenu";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter.";

function DashboardPage() {
    return(
        <section className="dashboard-page">
            <NavigationBar />
            <DashboardMenu />
            <AppFooter />
        </section>
    )
}

export default DashboardPage;