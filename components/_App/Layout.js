import React from 'react';
import Head from "next/head";
import { Container } from "semantic-ui-react";
import Footer from "./Footer";
import GoTop from './GoTop';
import StaticHeader from './StaticHeader';

const Layout = ({ children, user, store }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
                <title>Shoponix - React Next Multi Vendor Marketplace eCommerce Store</title>
                <meta name="description" content="Buy high-quality bicycle parts and save money while riding through Nevada." />
                <meta name="og:title" property="og:title" content="Shoponix - MERN Next eCommerce Store"></meta>
                <meta name="twitter:card" content="Shoponix - MERN Next eCommerce Store"></meta>
                <link rel="canonical" href="https://shoponix.envytheme.com/"></link>
                <meta property="og:image" content="https://res.cloudinary.com/dev-empty/image/upload/v1590078952/qlm6qb1hzxd6iccmaf82.jpg" />
            </Head>

            <StaticHeader user={user} store={store} />

            <Container fluid>
                {children}
            </Container>

            <Footer user={user} />

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    );
}

export default Layout;