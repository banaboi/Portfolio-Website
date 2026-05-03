import React from "react";

const Footer = () => {
    return (
        <footer id="footer" className="footer-container">
            <p>
                © {new Date().getFullYear()} Luke Banicevic. Designed by{" "}
                <a
                    href="https://www.instagram.com/re_entry.design/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Re-Entry Design
                </a>
                . Built with React &amp; Vite.
            </p>
            <p className="footer-tagline">// may the source be with you</p>
        </footer>
    );
};

export default Footer;
