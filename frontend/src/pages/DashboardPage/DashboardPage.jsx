import React from "react";
import "./DashboardPage.css";
import UserImageForm from "../../components/ImageForm/UserImageForm";

function DashboardPage() {
    return(
        <section className="dashboard-page">
            <UserImageForm/>
        </section>
    )
}

export default DashboardPage;