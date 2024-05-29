import { ReactNode } from 'react';
import Navbar from './Navbar.tsx';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className="container">{children}</main>
        </>
    );
};

export default Layout;
