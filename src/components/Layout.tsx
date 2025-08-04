import { ComponentProps, ReactNode } from "react";
import Navbar from "./Navbar.tsx";

const Layout = ({
	children,
	enableMainContainer = true,
	className,
}: {
	children: ReactNode;
	enableMainContainer?: boolean;
	className?: ComponentProps<"div">["className"];
}) => {
	return (
		<div className={className}>
			<Navbar />
			{enableMainContainer ? <main className="container">{children}</main> : children}
		</div>
	);
};

export default Layout;
