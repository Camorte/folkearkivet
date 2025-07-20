import { ReactNode } from "react";
import Navbar from "./Navbar.tsx";

const Layout = ({ children, enableMainContainer = true }: { children: ReactNode; enableMainContainer?: boolean }) => {
	return (
		<>
			<Navbar />
			{enableMainContainer ? <main className="container">{children}</main> : children}
		</>
	);
};

export default Layout;
