import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Archive from './pages/Archive.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Galleries from './pages/Galleries.tsx';
import ArticlesOverview from './pages/ArticlesOverview.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Article from './pages/Article.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Home /> },
            {
                path: '/arkivet',
                element: <Archive />
            },
            {
                path: '/biografi',
                element: <About />
            },
            {
                path: '/kontakt',
                element: <Contact />
            },
            {
                path: '/utstillinger',
                element: <Galleries />
            },
            {
                path: '/artikler',
                element: <ArticlesOverview />
            },
            {
                path: '/artikler/:article',
                element: <Article />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
