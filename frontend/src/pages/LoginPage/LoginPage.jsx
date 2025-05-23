import React from "react";
import "./LoginPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
function LoginPage() {
    return(
        <section className="login-page">
            <BackgroundVideo/>
            <LoginForm/>
        </section>
    )
}

export default LoginPage;