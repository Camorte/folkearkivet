import SignFolkeArkivet from "./svgs/SignFolkearkivet.tsx";
import { Link } from "react-router-dom";
import { icon } from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { MapPoint } from "../lib/types.ts";

const ICON = icon({
	iconUrl: "/assets/images/folkearkivet_map_marker.png",
	iconSize: [32, 32],
});

const Map = ({ content }: { content: MapPoint[] }) => {
	return (
		<MapContainer center={[64.573, 11.528]} zoom={5} className="h-[650px] z-[8]">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{content.map((point, index) => {
				return (
					<Marker
						icon={ICON}
						key={`${index}-${point.location.lat}-${point.location.lng}`}
						position={[point.location.lat, point.location.lng]}
					>
						<Popup>
							<div className="flex flex-col items-center">
								<SignFolkeArkivet title={point.title} description={point.detail} year={point.year} />
								<Link className="underline text-lg" to={`/arkivet/${content[index].contributionRef._id}`}>
									{content[index].contributionRef.title}
								</Link>
							</div>
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
};

export default Map;
