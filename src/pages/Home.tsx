import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import Layout from "../components/Layout.tsx";
import { getLandingPage } from "../lib/sanity.ts";
import { LandingPage } from "../lib/types.ts";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { Link } from "react-router-dom";
import PortableTextComponent from "../components/PortableTextComponent.tsx";
import { PortableText } from "@portabletext/react";
import SignFolkeArkivet from "../components/svgs/SignFolkearkivet.tsx";

const ICON = icon({
	iconUrl: "/assets/images/folkearkivet_map_marker.png",
	iconSize: [32, 32],
});

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
		<Layout enableMainContainer={false}>
			{isLoading ? (
				<div className="landing-container">
					<p>Laster inn...</p>
				</div>
			) : (
				<div className="pt-[80px] pb-[80px]">
					<div className="landing-container mb-[48px]">
						<p className="font-bold">
							Folkearkivet er et levende og visuelt mediearkiv over kontemporær folkekunst. Arkivet samler historier,
							bilde, tegning, tekst, film, performance, kostyme, dekorasjon og noen forbausende objekter fra Norge, og
							siden Sápmi, Sverige, Danmark, Finland, Island, Grønland og Færøyene.
						</p>
					</div>
					<div className="w-full">
						<h2 className="landing-container">Opplev Folkearkivet på kartet</h2>
						<MapContainer center={[59.91, 10.75]} zoom={6} className="h-[650px] z-[8]">
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							{landingPage.content.map((point, index) => {
								console.log(point);
								return (
									<Marker
										icon={ICON}
										key={`${index}-${point.location.lat}-${point.location.lng}`}
										position={[point.location.lat, point.location.lng]}
									>
										<Popup>
											<div className="flex flex-col items-center">
												<SignFolkeArkivet title={point.title} description={point.detail} year={point.year} />
												<Link
													className="underline text-lg"
													to={`/arkivet/${landingPage.content[index].contributionRef._id}`}
												>
													{landingPage.content[index].contributionRef.title}
												</Link>
											</div>
										</Popup>
									</Marker>
								);
							})}
						</MapContainer>
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
