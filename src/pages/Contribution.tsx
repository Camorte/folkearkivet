import { useEffect, useState } from "react";
import Layout from "../components/Layout.tsx";
import { useParams } from "react-router-dom";
import { getContribution, urlFor } from "../lib/sanity.ts";
import type { Contribution } from "../lib/types.ts";

const Contribution = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [contribution, setContribution] = useState<Contribution>();

	useEffect(() => {
		if (params.id) {
			getContribution(params.id)
				.then((response) => {
					setContribution(response);
				})
				.finally(() => setIsLoading(false));
		}
	}, []);

	return (
		<Layout>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					{contribution && (
						<div className="flex flex-col md:flex md:flex-row md:gap-x-8">
							<div className="md:max-w-[66%]">
								<img
									className={"w-full mb-8 md:mb-0"}
									src={urlFor(contribution.image).url()}
									alt={contribution.title}
								/>
							</div>
							<div className="flex flex-col w-full md:fixed md:bottom-0 md:right-0 md:py-8 md:pr-[7vw] md:max-w-[34%] ">
								<h2 className="mt-0 w-full wrap-break-word">{contribution.title}</h2>
								<p className="text-lg italic">
									{contribution.location}, {contribution.category}
								</p>
								<p>{contribution.description}</p>
							</div>
						</div>
					)}
				</>
			)}
		</Layout>
	);
};

export default Contribution;
