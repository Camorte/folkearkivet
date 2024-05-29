import { ReactNode } from 'react';
import Navbar from './Navbar.tsx';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="container flex flex-col">
            <div className="flex flex-row items-center justify-between md:items-start md:flex-col w-full mb-12">
                <Link className="hidden md:block md:mb-4" to={'/'}>
                    <img
                        className=" max-w-[750px]"
                        src="/assets/images/Folkearkivet_alt_Navnetrekk.svg"
                        alt={'Folkearkivet logo'}
                    />
                </Link>
                <Link className="block md:hidden md:mb-4" to={'/'}>
                    <img
                        className="max-w-[100px]"
                        src="/assets/images/Folkearkivet_logo.svg"
                        alt={'Folkearkivet logo'}
                    />
                </Link>
                <Navbar />
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
