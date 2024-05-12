import { Link } from 'react-router-dom';

const NavLinks = [
    { name: 'Arkivet', path: '/arkivet' },
    { name: 'Utstillinger', path: '/utstillinger' },
    { name: 'Artikler', path: '/artikler' },
    { name: 'Biografi', path: '/biografi' },
    { name: 'Kontakt', path: '/kontakt' }
];

const Navbar = () => {
    return (
        <ul className="flex flex-row gap-x-8">
            {NavLinks.map((nav) => (
                <li key={`navlink-${nav.name}`}>
                    <Link className="hover:underline" to={nav.path}>
                        <p>{nav.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Navbar;
