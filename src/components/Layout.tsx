import { ReactNode } from 'react';
import Navbar from './Navbar.tsx';
import { Link } from 'react-router-dom';

const Layout = ({
    pageName,
    children
}: {
    pageName?: string;
    children: ReactNode;
}) => {
    return (
        <div className="container flex flex-col">
            <div className="flex flex-row w-full justify-between mb-12">
                <div className="flex flex-col justify-between">
                    <Link to={'/'}>
                        <h1>Folkearkivet</h1>
                    </Link>
                    {pageName && <h2 className="font-normal">{pageName}</h2>}
                </div>
                <Navbar />
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
