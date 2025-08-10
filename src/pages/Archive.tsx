import Layout from "../components/Layout.tsx";
import { useEffect, useState } from "react";
import { getContributions, getCategories, urlFor } from "../lib/sanity.ts";
import { ContributionOverview } from "../lib/types.ts";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CategoryButton from "../components/CategoryButton.tsx";

interface Category {
	_id: string;
	name: string;
	image: {
		asset: {
			url: string;
			metadata: {
				lqip: string;
				dimensions: {
					width: number;
					height: number;
				};
			};
		};
	};
}

const Archive = () => {
	const [archive, setArchive] = useState<ContributionOverview[]>([]);
	const [allContributions, setAllContributions] = useState<ContributionOverview[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

	useEffect(() => {
		Promise.all([getContributions(), getCategories()])
			.then(([contributionsData, categoriesData]: [ContributionOverview[], Category[]]) => {
				setAllContributions(contributionsData);
				setArchive(contributionsData);
				setCategories(categoriesData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCategoryFilter = (categoryId: string | null) => {
		setSelectedCategory(categoryId);
		console.log(categoryId);
		if (categoryId === null) {
			setArchive(allContributions);
		} else {
			const filtered = allContributions.filter((contribution) => contribution.categoryRef?._id === categoryId);
			setArchive(filtered);
		}
	};

	return (
		<Layout>
			<div className="mb-8">
				<div className="overflow-x-auto">
					<div className="flex gap-4 pb-4 min-w-max">
						<button
							onClick={() => handleCategoryFilter(null)}
							className={classNames(
								"px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-md whitespace-nowrap",
								{
									"border-blue-500 bg-blue-50 text-blue-700": selectedCategory === null,
									"border-gray-200 bg-white text-gray-700 hover:border-gray-300": selectedCategory !== null,
								},
							)}
						>
							Alle kategorier
						</button>
						{categories.map((category) => (
							<CategoryButton
								key={category._id}
								category={category}
								isActive={selectedCategory === category._id}
								onClick={() => handleCategoryFilter(category._id)}
							/>
						))}
					</div>
				</div>
			</div>
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
