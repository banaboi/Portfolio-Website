// src/App.tsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";

const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TagPage = lazy(() => import("./pages/TagPage"));

const Fallback = () => <div className="lazy-fallback" aria-hidden="true" />;

const App = () => (
    <ThemeProvider>
        <BrowserRouter>
            <div className="App">
                <a href="#intro" className="skip-to-content">
                    Skip to main content
                </a>
                <Nav />
                <main className="page">
                    <Suspense fallback={<Fallback />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog" element={<BlogIndex />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />
                            <Route path="/blog/tags/:tag" element={<TagPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
