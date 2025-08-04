import Layout from "../components/Layout.tsx";
import { useEffect, useState } from "react";
import { getContributions, urlFor } from "../lib/sanity.ts";
import { Contribution, ContributionOverview } from "../lib/types.ts";
import { Link } from "react-router-dom";
import classNames from "classnames";

const Archive = () => {
	const [archive, setArchive] = useState<ContributionOverview[]>([]);
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

	useEffect(() => {
		getContributions()
			.then((data: Contribution[]) => {
				setArchive(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Layout>
			<ul className="photo-gallery">
				{archive.map((contribution, index) => (
					<li key={contribution._id + "-" + index} className="relative group mb-[12px]">
						<div className="relative w-full mb-2 overflow-hidden">
							<img
								width={400}
								height={400}
								className="invisible"
								alt=""
								aria-hidden="true"
								src={contribution.image.asset.metadata.lqip}
							/>
							{!loadedImages[contribution._id] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
							<Link to={`/arkivet/${contribution._id}`}>
								<img
									className={classNames(
										"absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 hover:opacity-50",
										{
											"opacity-0": !loadedImages[contribution._id],
											"opacity-100": loadedImages[contribution._id],
										},
									)}
									width={400}
									height={400}
									srcSet={[
										`${urlFor(contribution.image).width(300).auto("format").url()} 300w`,
										`${urlFor(contribution.image).width(600).auto("format").url()} 600w`,
										`${urlFor(contribution.image).width(900).auto("format").url()} 900w`,
									].join(", ")}
									sizes="(max-width: 640px) 50vw, 20vw"
									alt={contribution.title}
									onLoad={() => {
										setLoadedImages((prev) => ({
											...prev,
											[contribution._id]: true,
										}));
									}}
								/>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default Archive;
