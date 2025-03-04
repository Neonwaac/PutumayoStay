import react from "react";
import './AboutPage.css';
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";

function AboutPage(){
    return(
        <section className="about-page">
            <NavigationBar />
            <AppFooter />
        </section>
    )
}

export default AboutPage;
