import react from "react";
import "./RegisterPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
function RegisterPage() {
    return (
        <section className="register-page">
            <BackgroundVideo/>
            <RegisterForm/>
        </section>
    );
}

export default RegisterPage;