import { useEffect, useState } from "react";
import Layout from "../components/Layout.tsx";
import { getLandingPage } from "../lib/sanity.ts";
import { LandingPage } from "../lib/types.ts";
import "leaflet/dist/leaflet.css";
import PortableTextComponent from "../components/PortableTextComponent.tsx";
import { PortableText } from "@portabletext/react";
import Map from "../components/Map.tsx";

function Home() {
	const [landingPage, setLandingPage] = useState<LandingPage>({ content: [] });
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getLandingPage()
			.then((response) => {
				setLandingPage(response);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<Layout className="bg-[#F7DBA7] text-black" enableMainContainer={false}>
			{isLoading ? (
				<div className="landing-container">
					<p>Laster inn...</p>
				</div>
			) : (
				<div className="pt-[80px] pb-[80px]">
					{landingPage.description && (
						<div className="landing-container mb-[48px]">
							<p className="font-bold">{landingPage.description}</p>
						</div>
					)}
					<div className="w-full">
						<h2 className="landing-container">{landingPage.mapTitle}</h2>
						<Map content={landingPage.content} />
					</div>
					<div className="landing-container mt-[60px]">
						{landingPage.biography && (
							<div className="mb-[48px]">
								<h3>{landingPage.biography.title}</h3>
								<PortableText value={landingPage.biography.content} components={PortableTextComponent} />
							</div>
						)}
						{landingPage.contact && (
							<>
								<h3>{landingPage.contact.title}</h3>
								<PortableText value={landingPage.contact.content} components={PortableTextComponent} />
							</>
						)}
					</div>
				</div>
			)}
		</Layout>
	);
}

export default Home;
