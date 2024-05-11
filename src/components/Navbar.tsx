import { Link } from 'react-router-dom';

const NavLinks = [
    { name: 'Arkivet', path: '/arkivet' },
    { name: 'Utstillinger', path: '/utstillinger' },
    { name: 'Artikler', path: '/artikler' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Kontakt oss', path: '/kontakt-oss' }
];

const Navbar = () => {
    return (
        <ul>
            {NavLinks.map((nav) => (
                <li id={`navlink-${nav.name}`}>
                    <Link to={nav.path}>{nav.name}</Link>
                </li>
            ))}
        </ul>
    );
};

export default Navbar;
