import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Archive from './pages/Archive.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Galleries from './pages/Galleries.tsx';
import Articles from './pages/Articles.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { path: '', element: <Home /> },
            {
                path: '/arkivet',
                element: <Archive />
            },
            {
                path: '/om-oss',
                element: <About />
            },
            {
                path: '/kontakt-oss',
                element: <Contact />
            },
            {
                path: '/utstillinger',
                element: <Galleries />
            },
            {
                path: '/artikler',
                element: <Articles />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
