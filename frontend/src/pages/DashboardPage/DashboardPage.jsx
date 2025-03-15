import React from "react";
import "./DashboardPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import DasboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

function DashboardPage() {
    return(
        <section className="dashboard-page">
            <NavigationBar />
            <DasboardLayout />
            <AppFooter />
        </section>
    )
}

export default DashboardPage;