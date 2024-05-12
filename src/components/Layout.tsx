import { ReactNode } from 'react';
import Navbar from './Navbar.tsx';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="container flex flex-col">
            <div className="flex flex-col w-full mb-12">
                <Link className="mb-4" to={'/'}>
                    <h1 className="m-0">Folkearkivet</h1>
                </Link>
                <Navbar />
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
