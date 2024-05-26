import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

const NavLinks = [
    { name: 'Arkivet', path: '/arkivet' },
    { name: 'Program', path: '/program' },
    { name: 'Artikler', path: '/artikler' },
    { name: 'Biografi', path: '/biografi' },
    { name: 'Kontakt', path: '/kontakt' }
];

const NavbarLinks = () => (
    <>
        {NavLinks.map((nav) => (
            <li key={`navlink-${nav.name}`}>
                <Link className="hover:underline" to={nav.path}>
                    <p className="text-3xl md:text-xl">{nav.name}</p>
                </Link>
            </li>
        ))}
    </>
);

const Navbar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <div className="flex items-center">
                <ul className="hidden md:flex-row md:gap-x-8 md:flex">
                    <NavbarLinks />
                </ul>
                <button
                    className="mb-0 px-4 md:hidden"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <GiHamburgerMenu />
                </button>
            </div>
            {showMenu && (
                <div className="flex flex-col fixed w-2/3 h-full right-0 bg-black top-0">
                    <button
                        className="self-end mr-4 my-2"
                        onClick={() => setShowMenu(false)}
                    >
                        <IoMdClose />
                    </button>
                    <ul className="flex flex-col pl-4">
                        <NavbarLinks />
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
