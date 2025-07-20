import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const NavLinks = [
	{ name: "ARKIVET", path: "/arkivet" },
	{ name: "Arrangementer", path: "/arrangementer" },
];

const NavbarLinks = ({ currentRoute }: { currentRoute: string }) => (
	<>
		{NavLinks.map((nav) => (
			<li className="group w-fit block" key={`navlink-${nav.name}`}>
				<Link to={nav.path}>
					<p
						className={`group-hover:border-b-2 group-hover:border-black py-2 px-2 md:text-xl ${currentRoute.includes(nav.path) ? "border-b-2 border-black" : ""}`}
					>
						{nav.name}
					</p>
				</Link>
			</li>
		))}
	</>
);

const Navbar = () => {
	const location = useLocation();
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Function to handle click events
		const handleClickOutside = (event: MouseEvent) => {
			if (divRef.current && !divRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [divRef]);

	return (
		<div className="px-[5vw] md:px-[7vw] sticky top-0 bg-[#F7DBA7] flex flex-row items-center justify-between w-full py-4 z-10">
			<Link className="hidden md:block" to={"/"}>
				<img className="max-w-[350px]" src="/assets/images/Logoskilt.svg" alt={"Folkearkivet logo"} />
			</Link>
			<Link className="block md:hidden" to={"/"}>
				<img className="max-w-[100px]" src="/assets/images/Folkearkivet_logo.svg" alt={"Folkearkivet logo"} />
			</Link>
			<div className="flex items-center">
				<ul className="hidden md:flex-row md:gap-x-8 md:flex">
					<NavbarLinks currentRoute={location.pathname} />
				</ul>
				<button className="mb-0 px-4 md:hidden" onClick={() => setShowMenu(!showMenu)}>
					<GiHamburgerMenu />
				</button>
			</div>
			{showMenu && (
				<div className="fixed top-0 right-0 w-full h-full">
					<div ref={divRef} className="absolute flex flex-col w-2/3 h-full bg-[#F7DBA7] right-0">
						<button className="self-end mr-4 my-2" onClick={() => setShowMenu(false)}>
							<IoMdClose />
						</button>
						<ul className="flex flex-col pl-4 items-center  ">
							<NavbarLinks currentRoute={location.pathname} />
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
