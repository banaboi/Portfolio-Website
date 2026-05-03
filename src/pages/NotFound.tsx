// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <section className="section not-found">
        <h1 className="sub-heading">Not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">← back home</Link>
    </section>
);

export default NotFound;
