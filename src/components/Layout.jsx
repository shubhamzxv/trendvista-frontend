import React from 'react';
import { Helmet } from "react-helmet";
import Footer from './Footer';
import NavBar from './NavBar';
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <NavBar />
            <main style={{ minHeight: "60vh" }}>
                <Toaster/>
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "TrendVista",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Shubham",
};

export default Layout