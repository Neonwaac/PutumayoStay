import React from "react";
import "./BlockchainPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppFooter from "../../components/AppFooter/AppFooter";
import BlockchainLayout from "../../layouts/BlockchainLayout/BlockchainLayout";

function BlockchainPage() {
    return(
        <section className="blockchain-page">
            <NavigationBar />
            <BlockchainLayout />
            <AppFooter />
        </section>
    )
}

export default BlockchainPage;